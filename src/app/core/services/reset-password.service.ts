import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  // base_url = 'https://localhost:7158/api/Account/ResetPassword';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  resetPassword(
    token: string,
    email: string,
    password: string
  ): Observable<any> {
    const url = 'https://localhost:7158/api/Account/ResetPassword';

    const data = {
      token: token,
      email: email,
      password: password,
      confirmedPassword: password,
    };

    return this.http.post(url, data, { headers: this.headers });
  }
}
