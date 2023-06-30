import { Component } from '@angular/core';
import { User } from 'src/app/core/Models/UserModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/User.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  helper = new JwtHelperService();
  decodedToken: any;
  encodedToken!: string;
  user: User = new User();

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.service.user$.subscribe((userId: string) => {
      this.service.GetUserById(userId).subscribe((data) => {
        this.user = data.data;
      });
    });
    if (localStorage.getItem('userBookingAppToken')) {
      const encodedToken = localStorage.getItem('userBookingAppToken');
      if (encodedToken) {
        this.decodedToken = this.helper.decodeToken(encodedToken);
        this.service.GetUserById(this.decodedToken.Id).subscribe((data) => {
          this.user = data.data;
        });
      }
    }
  }

  checkIfLoggedIn() {
    if (!localStorage.getItem('userBookingAppToken')) return false;
    if (this.helper.decodeToken(localStorage.getItem('userBookingAppToken')!))
      return true;
    return false;
  }

  logout() {
    localStorage.removeItem('userBookingAppToken');
    localStorage.removeItem('userBookingAppId');
    this.user = new User();
    this.router.navigate(['/']);
  }
}
