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

    ){}


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
      this.clientBookingService.getClientBookingById(this.userId,this.BookingId).subscribe(data=>{
        this.data=data.data
        console.log("from oninit")
        console.log(data)
        if(data.data.bookingItems.length >1 ){
          this.largeScreen =true;
        }

       })
    });

  }

  rate(event :  RatingRateEvent){
    console.log(event)
  }


}
