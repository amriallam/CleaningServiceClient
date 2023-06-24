import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { BookingModel } from 'src/app/core/Models/BookinModel';
import { BookingStaus } from 'src/app/core/Models/BookingStaus';
import { Resource } from 'src/app/core/Models/Resource';
import { Service } from 'src/app/core/Models/Service';
import { BookingDetailsVM } from 'src/app/core/ViewModels/booking-details-vm';
import { BookingService } from 'src/app/core/services/booking.service';
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
  Bookingmodel?: BookingModel;
  bookingData !: BookingDetailsVM ;
  service ?: Service ;
  constructor(private resourceService: ResourceService,
    private location :Location,
    private bookingService : BookingService,
    private serviceService : ServiceService){
      if(this.bookingService.bookingDetails.selectedResIds != undefined){
        // console.log("here" +bookingService.bookingDetails);
        this.bookingData = bookingService.bookingDetails;
        this.resourceIds = this.bookingService.bookingDetails.selectedResIds;
        
        // console.log(this.resourceIds);
      }
      
  }
  ngOnInit(){
    if(this.bookingData.serviceId != undefined)
  {
    this.serviceService.getAllById(+this.bookingData.serviceId).subscribe(res =>
        this.service= res.data[0]
      )
  } 
    // this.resourceIds.forEach(element => {
    //   this.resourceService.GetResouceById(+element).subscribe((res)=>{
    //         this.resourceList.push(res.data)
    //   });
    // })

  }
  
  back(){
    // this.bookingService.AddBookingDetails(
    //   this.bookingService.bookingDetails.selectedResIds,
    //   this.bookingService.AddBookingDetails.
    // );
    this.location.back()
  }
  // adding address , userId from form
  ConfirmBooing(payMethod :string){
    this.Bookingmodel = new BookingModel(
      this.bookingService.bookingDetails.date as string ,
      this.bookingService.bookingDetails.from as string,
      this.bookingService.bookingDetails.to as string,
      "tanta",
      this.bookingService.bookingDetails.totalCost as number,
      '41d1d38c-9fc3-451f-a33c-3e83663c368a',
      this.bookingService.bookingDetails.serviceId as number,
      this.bookingService.bookingDetails.selectedResIds as number[]
      );
      
      if(this.Bookingmodel){
        this.bookingService.AddNewBoooking(this.Bookingmodel, payMethod).subscribe(res =>{
          console.log(res.data);
          alert('gooing to payment');
          window.location.href =res.data.result;
        })
      }
      else{
        alert('backend handeled');
      }
  }

}
