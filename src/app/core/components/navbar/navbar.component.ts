import { Component ,OnInit } from '@angular/core';
import { User } from 'src/app/core/Models/UserModel';
import {JwtHelperService}from '@auth0/angular-jwt';
import { UserService } from '../../services/User.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  
  helper=new JwtHelperService();
  decodedToken:any;
  encodedToken!:string;
  user:User=new User();
  userId!:number;

  constructor(private service:UserService){
  }
  


  ngOnInit(): void {
    const encodedToken = localStorage.getItem("userBookingAppToken");
    if (encodedToken !== null) {
      this.encodedToken = encodedToken;
    }
   this.decodedToken=this.helper.decodeToken(this.encodedToken)
 
    this.service.GetUserById( this.decodedToken.Id).subscribe(data=>{
      this.user=data?.data;
    })
  }


  checkIfLoggedIn() {
    return localStorage.getItem('userBookingAppToken');
  }
  logout() {
    localStorage.removeItem('userBookingAppToken');
    localStorage.removeItem('userBookingAppId');
  }

}

