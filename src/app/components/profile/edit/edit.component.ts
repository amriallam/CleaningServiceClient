import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {UserService} from '../../../core/services/User.service';
import { User } from 'src/app/core/Models/UserModel';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  helper=new JwtHelperService();
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

  userId : string ="e156548c-dded-4e6d-ad39-1dcf98ba5269";
  user:User=new User("das", "sss", "FirstNamess", "LastNamess", "Emails", "Address", "PhoneNumber",  new Date())

  constructor(private service:UserService){ }
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
  
  onSubmit() {
    console.log(this.emailForm.value);
  }
  ngOnInit(): void {
    const encodedToken = localStorage.getItem("userBookingAppToken");
    if (encodedToken !== null) {
      this.encodedToken = encodedToken;
    }
   this.decodedToken=this.helper.decodeToken(this.encodedToken)
   this.userId = this.decodedToken.Id
    this.service.GetUserById(this.userId).subscribe(data=>{
      this.user=data?.data;
    })
  }
  
  
  UpdateActive(who:string){
    this.isUpdateNameActive= false;
    this.isUpdateUserNameActive = false;
    this.isUpdateEmailActive= false;
    this.isUpdatePhoneActive = false;
    this.isUpdateAddressActive = false;

    switch(who){
      case "name": { 
        this.isUpdateNameActive= true; 
        break; 
     } 
     case "userName": { 
      this.isUpdateUserNameActive = true;
      break; 
     } 
     case "email": { 
      this.isUpdateEmailActive= true;
      break; 
     } 
     case "phone": { 
      this.isUpdatePhoneActive= true;
      break; 
     } 
     case "address": { 
      this.isUpdateAddressActive = true;
      break; 
     } 
     
    }
    

  }

  UpdateDeactivate(){
    this.isUpdateNameActive= false;
    this.isUpdateUserNameActive = false;
    this.isUpdateEmailActive= false;
    this.isUpdatePhoneActive = false;
    this.isUpdateAddressActive = false;
    this.IsUserNameErrors = false;
    this.IsEmailErrors = false;

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
          this.UpdateDeactivate()
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
          this.UpdateDeactivate()
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
          this.UpdateDeactivate()
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
    console.log(1)
    console.log(this.phoneForm.valid)
    if(this.phoneForm.valid){
      const user = new User()
      user.id = this.userId;
      user.phoneNumber = this.phone?.value ?? undefined ;
      this.service.EditUser(user).subscribe(
        res => {
          console.log('User updated successfully:', res);
          this.UpdateDeactivate()
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
          this.UpdateDeactivate()
          this.user.address = this.address?.value ?? undefined ;
        },
        err => {
          console.log('Error updating user:', err);
        }
      )

     
    }
  }

 


}
