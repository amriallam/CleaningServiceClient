import { ServiceService } from './../../core/services/service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/Models/Service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  userId : string | null= null;
  userName : string | undefined= undefined;
  email : string | undefined= undefined;
  services : Service[] =[];
  comment : string | null = null;

  constructor(private userService: UserService,
              private router: Router,
              private serviceService: ServiceService){}
  ngOnInit(): void {
    this.serviceService.getAll().subscribe(res => {
      this.services = res.data
    });
    this.userId = localStorage.getItem('userBookingAppId');
    if(this.userId != null){
      this.userService.GetUserById(this.userId).subscribe(res=>{
        this.userName = res.data.firstName + ' ' + res.data.lastName;
        this.email = res.data.email;
      });
    }
  }

  sendEmail(){
    this.userId = localStorage.getItem('userBookingAppId');
    if(this.userId == null){
      this.router.navigate(['/login'])
    }else{
      if(this.comment!= null){
        
      }
    }
  }

}
