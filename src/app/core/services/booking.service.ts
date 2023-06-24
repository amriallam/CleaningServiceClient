import { BookingDetailsVM } from './../ViewModels/booking-details-vm';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { BookingItem } from '../Models/BookingItem';
import { apiUrl } from 'src/environment';
import { BookingModel } from '../Models/BookinModel';
import { BookingResModel } from '../Models/BookingResModel';
import { ResponseModelObject } from '../Models/ResponseModelObject';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingDetails: BookingDetailsVM;

  constructor(private httpClient: HttpClient) {
    this.bookingDetails=new BookingDetailsVM();
  }

  AddBookingDetails(selectedResourceIds : number[],
                    selectedResourceNames: string[],
                    date: string, from : string, to : string,
                    servId: number,totalCost: number ){
    this.bookingDetails.selectedResIds = selectedResourceIds;
    this.bookingDetails.selectedResourceNames = selectedResourceNames;
    this.bookingDetails.date = date;
    this.bookingDetails.from = from;
    this.bookingDetails.to = to;
    this.bookingDetails.totalCost = totalCost;
    this.bookingDetails.serviceId = servId;
  }

  getAllBookingItems(): Observable<ResponseModel<BookingItem>> {
    return this.httpClient.get<ResponseModel<BookingItem>>(apiUrl + `BookingItem`);
  }

  // getBookingItemsByResourceId(ResourceId: number): Observable<ResponseModel<BookingItem>> {
  //   return this.httpClient.get<ResponseModel<BookingItem>>(`${apiUrl}BookingItem?ResourceId=${ResourceId}`);
  // }

  // getBookingItemsByBookId(BookId: number): Observable<ResponseModel<BookingItem>> {
  //   return this.httpClient.get<ResponseModel<BookingItem>>(`${apiUrl}BookingItem?BookId=${BookId}`);
  // }

  // AddBookingItem(bookingItem: BookingItem): Observable<BookingItem> {
  //   return this.httpClient.post<BookingItem>(`${apiUrl}BookingItem/AddOne`, bookingItem);
  // }

  // AddRangeOfBookingItem(bookingItems: BookingItem[]): Observable<BookingItem> {
  //   return this.httpClient.post<BookingItem>(`${apiUrl}BookingItem/AddRange`, bookingItems);
  // }

  // UpdateBookingItem(bookingId: number, bookingItem: BookingItem): Observable<BookingItem> {
  //   return this.httpClient.patch<BookingItem>(`${apiUrl}BookingItem?bookingId=${bookingId}`,bookingItem);
  // }

  AddNewBoooking(BookingModel: BookingModel , paymentMethod: string):Observable<ResponseModelObject<BookingResModel>>{
    return this.httpClient.post<ResponseModelObject<BookingResModel>>(`${apiUrl}ClientBooking/CreateNewBooking?paymentType=${paymentMethod}`,BookingModel );
  }
}
