import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  baseUrl = 'https://localhost:7158/api/Tickets/Ticket';
  createUserTicket( ticket: any): Observable<any> {
    return this.http.post(this.baseUrl, ticket ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          // Handle the 404 response here
          this.toastr.error('Ticket Creation Failed', 'Error');
          console.log('Not found');
        } else {
          // Handle other error responses
          this.toastr.error('Ticket Creation Failed', 'Error');
          // console.error(error);
        }
        return throwError('Something went wrong');
        this.toastr.error('something went worng', 'Error');
      })
    );
  }
}
