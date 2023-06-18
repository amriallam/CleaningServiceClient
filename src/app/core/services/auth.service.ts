import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    return localStorage.getItem('userBookingAppToken') !== null;
  }
  constructor() { }
}


