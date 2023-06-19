import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, catchError, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {
  constructor(private http: HttpClient) { }
  ConfirmEmail(userId: string, token: string): Observable<any> {
    const base_url = `https://localhost:7158/api/Account/confirm-email?userId=${userId}&token=${token}`;
    return this.http.get(base_url);
  }
}
