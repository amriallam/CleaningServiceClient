import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { BookingItem } from '../Models/BookingItem';
import { apiUrl } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selcetdResourceIds : number[]=[]; 
  constructor(private httpClient: HttpClient) { }


  getAllBookingItems(): Observable<ResponseModel<BookingItem>> {
    return this.httpClient.get<ResponseModel<BookingItem>>(apiUrl + `BookingItem`);
  }

  getBookingItemsByResourceId(ResourceId: number): Observable<ResponseModel<BookingItem>> {
    return this.httpClient.get<ResponseModel<BookingItem>>(`${apiUrl}BookingItem?ResourceId=${ResourceId}`);
  }
  getBookingItemsByBookId(BookId: number): Observable<ResponseModel<BookingItem>> {
    return this.httpClient.get<ResponseModel<BookingItem>>(`${apiUrl}BookingItem?BookId=${BookId}`);
  }

  AddBookingItem(bookingItem: BookingItem): Observable<BookingItem> {
    return this.httpClient.post<BookingItem>(`${apiUrl}/BookingItem/AddOne`, bookingItem);
  }
  AddRangeOfBookingItem(bookingItems: BookingItem[]): Observable<BookingItem> {
    return this.httpClient.post<BookingItem>(`${apiUrl}/BookingItem/AddRange`, bookingItems);
  }

  UpdateBookingItem(bookingId: number, bookingItem: BookingItem): Observable<BookingItem> {
    return this.httpClient.patch<BookingItem>(`${apiUrl}/BookingItem?bookingId=${bookingId}`,bookingItem);
  }

  getSelectedResources(){

  }

}
