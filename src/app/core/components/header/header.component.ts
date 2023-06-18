import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent {
  // checkIfLoggedIn() {
  //   return localStorage.getItem('userBookingAppToken');
  // }
  // logout() {
  //   localStorage.removeItem('userBookingAppToken');
  // }
  constructor() { }
}
