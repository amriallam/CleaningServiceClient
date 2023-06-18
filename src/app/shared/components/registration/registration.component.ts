import { Router } from '@angular/router';
import { Component, OnInit, createPlatform } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  missingFeildsErrosObject: any;
  userRegisterForm: FormGroup;
  submitted:boolean = false;
  fixedErrorToast() {
    return this.toastr.error('Registration Failed please try again');
  }
  registerUserFunc(data: object) {
    console.log(data);
    fetch('https://localhost:7158/api/Account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Registration Successful');
        } else if (res.status === 400) {
          console.log(res);
        } else {
          console.warn('Registration Failed: ' + res.status);
        }
      })
      .catch((err) => {
        console.warn('Registration Failed: ' + err);
      });
  }

  constructor(private router: Router,private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.userRegisterForm = this.formBuilder.group({
      firstName: [{value:null,disabled: false},[Validators.required, Validators.minLength(8),Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: [{value:null,disabled: false},[Validators.required, Validators.minLength(8),Validators.pattern('^[a-zA-Z ]*$')]],
      userName: [{value:null,disabled: false},[Validators.required, Validators.minLength(8),Validators.pattern('^[a-zA-Z ]*$')]],
      email: [{value:null,disabled: false},[Validators.required, Validators.email]],
      password: [{value:null,disabled: false}, [Validators.required,Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!#^~%*?&,.<>\\;:{}\[\]\|+\-=\_\)\(\)`\/\\\\\]]).*$/)]]
    });
  }

  get firstName() {
    return this.userRegisterForm.controls['firstName'];
  }
  get lastName() {
    return this.userRegisterForm.controls['lastName'];
  }
  get userName() {
    return this.userRegisterForm.controls['userName'];
  }
  get email() {
    return this.userRegisterForm.controls['email'];
  }
  get password() {
    return this.userRegisterForm.controls['password'];
  }

  Submit() {
    if (this.userRegisterForm.invalid) return ;
    this.submitted = true;
      try {
        fetch('https://localhost:7158/api/Account/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.userRegisterForm.value),
        })
          .then((res) => {
            if (res.status === 200) {
              // show toast from ngx-toastr
              this.toastr.success('Registration Successful', 'Success');
              this.router.navigate(['/login']);

              return;
            } else if (res.status === 400) {
              return res.json().then((data) => {
                // missing fields
                if (data.errors) {
                  let errors = data.errors;
                  this.missingFeildsErrosObject = errors;
                }
                // field not valid
                else if (data[0].description) {
                  // show toast from ngx-toastr
                  this.toastr.error(data[0].description, 'Registration Failed', {

                  });
                } else {
                  this.fixedErrorToast();
                }
              });
            } else {
              throw new Error('Registration Failed');
            }
          })
          .catch((err) => {
            this.fixedErrorToast();
          });
      } catch (err) {
        this.fixedErrorToast();
      }
      return;
  }

  ngOnInit(): void { }
}
