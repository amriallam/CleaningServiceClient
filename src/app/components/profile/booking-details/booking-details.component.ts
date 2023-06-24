import { Component, OnInit } from '@angular/core';
import { ClientBookingService } from 'src/app/core/services/ClientBooking.service';
import { BookingClient } from 'src/app/core/Models/BookingClient';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit{
  private userId:string = '41d1d38c-9fc3-451f-a33c-3e83663c368a';
  private BookingId!:number;
  public data!:any
   constructor(private clientBookingService : ClientBookingService,
    private route:ActivatedRoute
    
    ){}
   

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.BookingId = params['id'];
      this.clientBookingService.getClientBookingById('41d1d38c-9fc3-451f-a33c-3e83663c368a',this.BookingId).subscribe(data=>{
        this.data=data.data
        console.log(data.data)
       })
    });
   
  }


}
