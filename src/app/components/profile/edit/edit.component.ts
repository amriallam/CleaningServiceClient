import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {UserService} from '../../../core/services/User.service';
import { User } from 'src/app/core/Models/UserModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  helper=new JwtHelperService();
  editActive:boolean = false;
  decodedToken:any;
  encodedToken!:string;
  Action:String = "New userloyee"
  public isUpdateNameActive: boolean = false;
  public isUpdateUserNameActive: boolean = false;
  public isUpdateEmailActive: boolean = false;
  public isUpdatePhoneActive: boolean = false;
  public isUpdateAddressActive: boolean = false;
  public userNameErrors:string = "";
  public IsUserNameErrors: boolean = false;
  public EmailErrors:string = "";
  public IsEmailErrors: boolean = false;

  userId : string ="2f4d4152-871c-49c2-9355-0303bec672f6";
  user!:User;

  constructor(private service:UserService,
    private route: Router
    ){ }
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  nameForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  userNameForm = new FormGroup({
    userName: new FormControl('', Validators.required),
  });
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  });

  addressForm = new FormGroup({
    address: new FormControl('', Validators.required),
  });

  get userName() {
    return this.userNameForm.get('userName');
  }
  get address() {
    return this.addressForm.get('address');
  }
  get phone() {
    return this.phoneForm.get('phone');
  }
  public get email() {
    return this.emailForm.get('email');
  }
  get firstName() {
    return this.nameForm.get('firstName');
  }

  get lastName() {
    return this.nameForm.get('lastName');
  }
  

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("userBookingAppToken");
    if (encodedToken !== null) {
      this.encodedToken = encodedToken;
      this.decodedToken=this.helper.decodeToken(this.encodedToken)
      this.userId = this.decodedToken.Id
    }else{
      this.route.navigate(['/login'])
    }

    this.service.GetUserById(this.decodedToken.Id).subscribe(data=>{
      this.user=data?.data;
      console.log(data)
      this.fillFormToUpdate()
    })


    
  }
  
  

 
  UpdateName(){
    if(this.nameForm.valid){
      const user = new User()
      user.id = this.userId;
      user.firstName = this.firstName?.value ?? undefined ;
      user.lastName = this.lastName?.value ?? undefined;
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.user.firstName = this.firstName?.value ?? undefined ;
          this.user.lastName = this.lastName?.value ?? undefined;
        },
        err => {
          console.log('Error updating user:', err);
        }
      )

     
    }

  }
  UpdateEmail(){
    if(this.emailForm.valid){
      const user = new User()
      user.id = this.userId;
      user.email = this.email?.value ?? undefined ;
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.user.email = this.email?.value ?? undefined ;
          this.IsEmailErrors = false;
        },
        err => {
          console.log('Error updating user:', err);
          this.EmailErrors = err.error.message;
          this.IsEmailErrors = true;
        }
      )

     
    }
  }
  UpdateUserName(){
    if(this.userNameForm.valid){
      const user = new User()
      user.id = this.userId;
      user.userName = this.userName?.value ?? undefined ;
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.user.userName = this.userName?.value ?? undefined ;
          this.IsUserNameErrors = false;
        },
        err => {
          console.log('Error updating user:', err);
          this.userNameErrors = err.error.message;
          this.userNameErrors = err.error.message;
          this.IsUserNameErrors = true;
        }
      )

     
    }
  }
  UpdatePhone(){

    if(this.phoneForm.valid){
      const user = new User()
      user.id = this.userId;
      user.phoneNumber = this.phone?.value ?? undefined ;
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.user.phoneNumber = this.phone?.value ?? undefined ;
        },
        err => {
          console.log('Error updating user:', err);
        }
      )

     
    }
  }

  UpdateAddress(){

    if(this.addressForm.valid){
      const user = new User()
      user.id = this.userId;
      user.address = this.address?.value ?? undefined ;
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.user.address = this.address?.value ?? undefined ;
        },
        err => {
          console.log('Error updating user:', err);
        }
      )

     
    }
  }

 
  EditActive():void{
  this.accordion.openAll();
  this.editActive = true;
}

EditDeactivate():void{
  this.accordion.closeAll();
  this.editActive = false;
}
fillFormToUpdate(){
  console.log(this.user.email)

  this.nameForm.setValue({
    firstName : this.user.firstName??"This",
    lastName : this.user.lastName??"This"
  })
  this.emailForm.setValue({
    email:this.user.email??"Email@Example.com"
  })
  this.phoneForm.setValue({
    phone:this.user.phoneNumber??""
  })
  this.addressForm.setValue({
    address:this.user.address??""
  })
  
}
  Save():void{
  
    if(this.emailForm.valid 
      && this.nameForm.valid){
      const user = new User()
      user.id = this.userId;
      user.firstName = this.firstName?.value ?? undefined ;
      user.lastName = this.lastName?.value ?? undefined;
      user.email = this.email?.value ?? undefined ;
      if(this.addressForm.valid 
        ){
          user.address = this.address?.value ?? undefined ;
        }
        if( this.phoneForm.valid 
          ){
            user.phoneNumber = this.phone?.value ?? undefined ;
          }
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.user.address = this.address?.value ?? undefined ;
          this.user.firstName = this.firstName?.value ?? undefined ;
          this.user.lastName = this.lastName?.value ?? undefined ;
          this.user.email = this.email?.value ?? undefined ;
          this.user.phoneNumber = this.phone?.value ?? undefined ;
          this.fillFormToUpdate();
          this.EditDeactivate()
        },
        err => {
          console.log('Error updating user:', err);
        }
      )

     
    }
    
}


}
