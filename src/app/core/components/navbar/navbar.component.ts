import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  checkIfLoggedIn() {
    return localStorage.getItem('userBookingAppToken');
  }
  logout() {
    localStorage.removeItem('userBookingAppToken');
  }
}
