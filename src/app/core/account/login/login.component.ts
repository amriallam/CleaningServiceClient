import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login.service';
import jwt_decode from 'jwt-decode';
import { BookingService } from '../../services/booking.service';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  missingFeildsErrosObject: any;
  loginFormGroup: FormGroup;
  userBookingAppId: any;
  fixedErrorToast() {
    return this.toastr.error('Registration Failed please try again');
  }
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private bookinService: BookingService,
    private userService:UserService
  ) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', {
        updateOn: 'submit',
        validators: [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      }),

      password: new FormControl('', {
        updateOn: 'submit',
        validators: Validators.required,
      }),
    });
  }

  emailFEValidation = false;
  passwordFEValidation = false;

  ValidationFE() {
    if (this.loginFormGroup.controls['email'].invalid) {
      this.emailFEValidation = true;
    } else {
      this.emailFEValidation = false;
    }
    if (this.loginFormGroup.controls['password'].invalid) {
      this.passwordFEValidation = true;
    } else {
      this.passwordFEValidation = false;
    }
    return this.emailFEValidation, this.passwordFEValidation;
  }

  jwtDecode(res: any) {
    return jwt_decode(res.data.token) ? jwt_decode(res.data.token) : res;
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.ValidationFE();
    } else {
      this.emailFEValidation = false;
      this.passwordFEValidation = false;
      this.loginService
        .login(
          this.loginFormGroup.value.email,
          this.loginFormGroup.value.password
        )
        .subscribe((res) => {
          if (res.data.token) {
            this.userBookingAppId = this.jwtDecode(res).Id;
            localStorage.setItem('userBookingAppId', this.userBookingAppId);
            localStorage.setItem('userBookingAppToken', res.data.token);
            this.userService.upDateUser(this.userBookingAppId)
            this.toastr.success('Login Successful', 'Welcome');
            setTimeout(() => {
              if (this.bookinService.bookingDetails.serviceId)
               this.router.navigate(['/booking/bookingList']);
               else this.router.navigate(['/']);
            }, 1000);
          } else console.log(res);
        });
    }
  }
}
