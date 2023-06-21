import { Component ,OnInit } from '@angular/core';
import {UserService} from 'src/app/core/services/User.service';
import { User } from 'src/app/core/Models/UserModel';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  helper=new JwtHelperService();
  decodedToken:any;
  encodedToken!:string;
  userId : string ="e156548c-dded-4e6d-ad39-1dcf98ba5269";
  user:User=new User("das", "sss", "FirstNamess", "LastNamess", "Emails", "Address", "PhoneNumber",  new Date())
  constructor(private service:UserService){}

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("userBookingAppToken");
    if (encodedToken !== null) {
      this.encodedToken = encodedToken;
    }
   this.decodedToken=this.helper.decodeToken(this.encodedToken)
   this.userId = this.decodedToken.Id
    this.service.GetUserById(this.userId).subscribe(data=>{
      console.log(this.user)
      this.user=data?.data;
      console.log(this.user)
    })
  }
}

 