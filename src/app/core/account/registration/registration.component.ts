import { Router } from '@angular/router';
import { Component, OnInit, createPlatform } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  missingFeildsErrosObject: any;
  userRegisterForm: FormGroup;
  fixedErrorToast() {
    return this.toastr.error('Registration Failed please try again');
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private registerService: RegisterService
  ) {
    this.userRegisterForm = new FormGroup({
      firstName: new FormControl('', {
        updateOn: 'submit',
        validators: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      }),

      lastName: new FormControl('', {
        updateOn: 'submit',
        validators: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      }),

      userName: new FormControl('', {
        updateOn: 'submit',
        validators: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      }),

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
        validators: [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};\':"\\\\|,.<>/?]).{8,}$'
          ),
        ],
      }),
      confirmpassword: new FormControl('', {
        updateOn: 'submit',
        validators: [
          Validators.required,
          
        ],
      }),
    });
  }
  // afnanElhussini@123
  firstNameFEValidation = false;
  lastNameFEValidation = false;
  emailFEValidation = false;
  userNameFEValidation = false;
  passwordFEValidation = false;
  confirmpasswordFEValidation = false;
  matchPassword = false;

  ValidationFE() {
    if (this.userRegisterForm.controls['firstName'].invalid) {
      this.firstNameFEValidation = true;
    } else {
      this.firstNameFEValidation = false;
    }
    if (this.userRegisterForm.controls['lastName'].invalid) {
      this.lastNameFEValidation = true;
    } else {
      this.lastNameFEValidation = false;
    }
    if (this.userRegisterForm.controls['email'].invalid) {
      this.emailFEValidation = true;
    } else {
      this.emailFEValidation = false;
    }
    if (this.userRegisterForm.controls['userName'].invalid) {
      this.userNameFEValidation = true;
    } else {
      this.userNameFEValidation = false;
    }
    if (this.userRegisterForm.controls['password'].invalid) {
      this.passwordFEValidation = true;
    } else {
      this.passwordFEValidation = false;
    }
    if (this.userRegisterForm.controls['confirmpassword'].invalid) {
      this.confirmpasswordFEValidation = true;
    } else {
      this.confirmpasswordFEValidation = false;
    }
  }

  checkPasswords() {
    let pass = this.userRegisterForm.controls['password'].value;
    let confirmPass = this.userRegisterForm.controls['confirmpassword'].value;
    if (pass != confirmPass) {
      this.matchPassword = true;
      // console.log(' not matched' + pass + ' ' + confirmPass);
    } else {
      this.matchPassword = false;
      // console.log('matched' +pass + ' ' + confirmPass);
    }
  }

  onSubmit() {
    if (this.userRegisterForm.invalid) {
      this.checkPasswords();
      this.ValidationFE();
    } else {
      this.firstNameFEValidation = false;
      this.lastNameFEValidation = false;
      this.emailFEValidation = false;
      this.userNameFEValidation = false;
      this.passwordFEValidation = false;
      this.confirmpasswordFEValidation = false;
      this.matchPassword = false;
      this.registerService
        .register(
          this.userRegisterForm.value['email'],
          this.userRegisterForm.value['firstName'],
          this.userRegisterForm.value['userName'],
          this.userRegisterForm.value['lastName'],
          this.userRegisterForm.value['password']
        )
        .subscribe((res) => {
          if (res.status == 200) {
            this.router.navigate(['/email-sent']);
          }else if (res.status == 400) {
            this.toastr.error('error', res.data);
          }

        })
        
    }
  }

  ngOnInit(): void {}
}
