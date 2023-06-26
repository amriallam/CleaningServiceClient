import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment';
import { ResponseModel } from '../Models/ResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  CancelBooking(id:number):Observable<ResponseModel<string[]>> {
      return this.http.put<ResponseModel<string[]>>(apiUrl+'ClientBooking/CancelBooking/'+id,null);
    }
  
    Refund(id:number , paymentType:string):Observable<ResponseModel<string[]>> {
      return this.http.post<ResponseModel<string[]>>(apiUrl+'Payment/refund/'+id+"?paymentType="+paymentType,null);
    }
    Pay(id:number , paymentType:string):Observable<ResponseModel<string[]>> {
      return this.http.put<ResponseModel<string[]>>(apiUrl+'Payment/checkout/'+id+"?paymentType="+paymentType,null);
    }
  
}
