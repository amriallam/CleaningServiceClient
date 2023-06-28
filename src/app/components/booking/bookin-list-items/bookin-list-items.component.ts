import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingModel } from 'src/app/core/Models/BookinModel';
import { Resource } from 'src/app/core/Models/Resource';
import { Service } from 'src/app/core/Models/Service';
import { BookingDetailsVM } from 'src/app/core/ViewModels/booking-details-vm';
import { BookingService } from 'src/app/core/services/booking.service';
import { RegionService } from 'src/app/core/services/region.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ServiceService } from 'src/app/core/services/service.service';
@Component({
  selector: 'app-bookin-list-items',
  templateUrl: './bookin-list-items.component.html',
  styleUrls: ['./bookin-list-items.component.css']
})
export class BookinListItemsComponent {

  resourceIds :number[] =[];
  resourceList :Resource[]=[];
  totalPrice : number =0;
  bookingmodel?: BookingModel;
  bookingData !: BookingDetailsVM ;
  bookingForm :FormGroup;
  service ?: Service ;
  fullAddress ! : string ;
  userId ? : any ;
  constructor(private resourceService: ResourceService,
    private location :Location,
    private bookingService : BookingService,
    private serviceService : ServiceService,
    private formBuilder : FormBuilder,
    private regionService :RegionService,
    private router : Router){
      if(this.bookingService.bookingDetails.selectedResIds != undefined){
        this.bookingData = bookingService.bookingDetails;
        this.resourceIds = this.bookingService.bookingDetails.selectedResIds;
      }
      this.bookingForm= this.formBuilder.group({
        region: [{ value: '', disabled: true }],
        address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
        paymentMethod: ['', Validators.required]

      });
  }
  ngOnInit(){
    if(this.bookingData.serviceId != undefined)
    {
    this.serviceService.getById(+this.bookingData.serviceId).subscribe(res =>
        this.service= res.data
      )
    }
    if(this.bookingService.bookingDetails.regionId != undefined){
      this.regionService.getSystemRegionsById(this.bookingService.bookingDetails.regionId).subscribe(res =>
      {
        console.log(res.data.name)
        this.bookingForm.patchValue({
          region: res.data.name
        });
      })
    }
    if(localStorage.getItem('location') != null && localStorage.getItem("paymentMethod") != null){
      this.bookingForm.patchValue({
        address :localStorage.getItem('location'),
        paymentMethod:localStorage.getItem('paymentMethod')
      })

    }
  }

  back(){
    this.bookingService.AddBookingBack(
      this.resourceIds,
      this.bookingService.bookingDetails.totalCost as number
    );
    this.location.back()
  }
  // adding address , userId from form
  ConfirmBooing(){
    if (this.bookingForm.invalid) {
      return;
    }

    this.fullAddress = this.bookingForm.get('region')?.value +", "+this.bookingForm.get('address')?.value;
    this.userId = localStorage.getItem('userBookingAppId');
    if(this.userId == null){
          localStorage.setItem("location", this.bookingForm.get('address')?.value);
          localStorage.setItem("paymentMethod", this.bookingForm.get('paymentMethod')?.value )
          this.router.navigate(['/login'])
      }else{
        this.bookingmodel = new BookingModel(
          this.bookingService.bookingDetails.date as string ,
          this.bookingService.bookingDetails.from as string,
          this.bookingService.bookingDetails.to as string,
          this.fullAddress as string,
          this.bookingService.bookingDetails.totalCost as number,
          this.userId as string,
          this.bookingService.bookingDetails.serviceId as number,
          this.bookingService.bookingDetails.selectedResIds as number[]
        );
        console.log(this.fullAddress)
        const paymentMethod = this.bookingForm.get('paymentMethod')?.value;
        if(this.bookingmodel){
        
          this.bookingService.AddNewBoooking(this.bookingmodel, paymentMethod).subscribe(res =>{
            
            window.location.href =res.data.result;
          })
        }
        else{
          alert('backend handeled');
        }
      }
    }

}
