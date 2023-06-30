import { Component, OnInit } from '@angular/core';
import { ClientBookingService } from 'src/app/core/services/ClientBooking.service';
import { BookingClient } from 'src/app/core/Models/BookingClient';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RatingRateEvent } from 'primeng/rating';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit{
  value:number = 1;
  private BookingId!:number;
  public data!:any;
  userId!: string ;
  decodedToken:any;
  encodedToken!:string;
  helper=new JwtHelperService();
  largeScreen = false;

   constructor(private clientBookingService : ClientBookingService,
    private router: Router,

    private route:ActivatedRoute

    ){

      
    }


  ngOnInit(): void {

    const encodedToken = localStorage.getItem("userBookingAppToken");
    if (encodedToken !== null) {
      this.encodedToken = encodedToken;
      this.decodedToken=this.helper.decodeToken(this.encodedToken)
      this.userId = this.decodedToken.Id
    }else{
      this.router.navigate(['/login'])
    }

    this.route.params.subscribe(params => {
      this.BookingId = params['id'];
      this.clientBookingService.getClientBookingById( this.userId,this.BookingId).subscribe(data=>{
        this.data=data.data
        console.log(this.data)
        if(data.data.bookingItems.length >1 ){
          this.largeScreen =true;
        }
       })
    });

  }

  rate(event :  RatingRateEvent){
    console.log(event)
  }

   formatTime(timeString: string): any {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'h:mm a');
  }


}
