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
export class ForgetpasswordService {
  // base_url = 'https://localhost:7158/api/Account/ForgetPassword?Email=${encodeURIComponent(email)}';
  constructor(private http: HttpClient) {}

  public forgetPassword(email: string): Observable<any> {
  const url = `https://localhost:7158/api/Account/ForgetPassword?Email=${(email)}`;
    return this.http.post<any>(url, email);
   
    
  }
}
