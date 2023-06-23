import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { BookingModel } from 'src/app/core/Models/BookinModel';
import { BookingStaus } from 'src/app/core/Models/BookingStaus';
import { Resource } from 'src/app/core/Models/Resource';
import { BookingDetailsVM } from 'src/app/core/ViewModels/booking-details-vm';
import { BookingService } from 'src/app/core/services/booking.service';
import { ResourceService } from 'src/app/core/services/resource.service';
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
  
  constructor(private resourceService: ResourceService,
    private location :Location,
    private bookingService : BookingService){
      if(this.bookingService.bookingDetails.selectedResIds != undefined)
        this.resourceIds = this.bookingService.bookingDetails.selectedResIds ;
      console.log(bookingService.bookingDetails);
  }
  ngOnInit(){

    this.resourceIds.forEach(element => {
      this.resourceService.GetResouceById(+element).subscribe((res)=>{
        console.log(res.data)
        this.resourceList.push(res.data)
        this.totalPrice += res.data.price;
      });
    })

  }
  back(){
    this.location.back()
  }
  ConfirmBooing() {
      this.Bookingmodel = new BookingModel(
        "2023-07-05" ,
        "09:00:00",
        "12:00:00",
        "tanta",
        this.totalPrice,
        '12f47f9c-1794-4174-aa58-16b72bbca9ab',
        3,
        [8,9,10]
        );
      
      if(this.Bookingmodel){

        this.bookingService.AddNewBoooking(this.Bookingmodel).subscribe(res =>{
          console.log(res.data);
          alert('gooing to payment');
          window.location.href =res.data.result;
        })
      }
      else{
        alert('backend handeled ');
      }
  }

}
