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

      bookingService.bookingDetails = new BookingDetailsVM(
        '202,3-06-20','09:00:00','12:00:00', 'tanta', [1,2,3]);

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
    alert("booking process ");
    const dateString = this.bookingService.bookingDetails.date;
    const date = dateString !== undefined ? new Date(dateString as unknown as string) : undefined;
  
    if(date){

      this.Bookingmodel = new BookingModel(
        date ,
        this.bookingService.bookingDetails.from,
        this.bookingService.bookingDetails.to,
        this.bookingService.bookingDetails.location,
        BookingStaus.Pending,
        this.totalPrice,
        '00eb6241-75d1-4280-8f4b-a5f424234ba7',
        1,
        this.bookingService.bookingDetails.selectedResIds
        );
      }
      console.log(this.Bookingmodel);
      if(this.Bookingmodel!= undefined){

        this.bookingService.AddNewBoooking(this.Bookingmodel).subscribe(res =>{
          console.log(res);
          alert('gooing to payment ');
        })
      }
      else{
        alert('backend handeling');
      }
  }
}