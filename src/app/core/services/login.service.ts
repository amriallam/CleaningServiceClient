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
export class LoginService {
  constructor(private http: HttpClient,
    private ToastrService: ToastrService
    ) {}
  baseUrl = 'https://localhost:7158/api/Account/Login';
  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { email, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          // Handle the 404 response here
          this.ToastrService.error('Login Failed , Invalid credintials', 'Error');
          console.log('Not found');
        } else {
          // Handle other error responses
          this.ToastrService.error('Login Failed , Invalid credintials', 'Error');
          // console.error(error);
        }
        return throwError('Something went wrong');
        this.ToastrService.error('something went worng', 'Error');

      })
    );
  }
}
