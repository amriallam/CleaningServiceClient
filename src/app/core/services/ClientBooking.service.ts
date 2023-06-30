import { BookingDetailsVM } from './../ViewModels/booking-details-vm';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { BookingItem } from '../Models/BookingItem';
import { apiUrl } from 'src/environment';
import { BookingClient } from '../Models/BookingClient';
import { TransitionFees } from '../Models/transition-fees';
@Injectable({
  providedIn: 'root'
})
export class ClientBookingService {


  constructor(private httpClient: HttpClient) {

  }
 public getAllClientBooking(id:string): Observable<ResponseModel<BookingClient[]>> {
    return this.httpClient.get<ResponseModel<BookingClient[]>>(apiUrl + `ClientBooking/user/`+ id);
  }

  public getClientBookingById(id:string,bookingId : number): Observable<ResponseModel<BookingClient>> {
    return this.httpClient.get<ResponseModel<BookingClient>>(apiUrl + `ClientBooking/user/`+ id +`?bookingId=`+bookingId);
  }

  
}





