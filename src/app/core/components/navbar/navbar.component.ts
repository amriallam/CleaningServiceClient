import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  
  ngOnInit(): void {
  
    console.log( localStorage.getItem('userBookingAppId') );
    if (localStorage.getItem('userBookingAppId')){
      console.log('userBookingAppId is set');
      console.log('USER SIGNED IN')
    }
  }


  checkIfLoggedIn() {
    return localStorage.getItem('userBookingAppToken');
  }
  logout() {
    localStorage.removeItem('userBookingAppToken');
    localStorage.removeItem('userBookingAppId');
  }

}
