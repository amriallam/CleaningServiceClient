import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  missingFeildsErrosObject: any;
  loginForm: FormGroup;
  submitted = false;


  fixedErrorToast() {
    return this.toastr.error('Registration Failed please try again');
  }
  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: [{value:null,disabled: false}, [Validators.required, Validators.email]],
      password: [{value:null,disabled: false}, [Validators.required,Validators.minLength(8)]]
    });
  }


  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  // emailFEValidation = false;
  // passwordFEValidation = false

  Submit() {
    if (this.loginForm.invalid) return;
    this.submitted = true;
    this.loginForm.get("email")?.disable();
    this.loginForm.get("password")?.disable();
    fetch('https://localhost:7158/api/Account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.loginForm.value),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            localStorage.setItem('userBookingAppToken', data.token);
            // show toast from ngx-toastr
            this.toastr.success('Login Successful', 'Welcome');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          });


          return;
        } else if (res.status === 400) {
          return res.json().then((data) => {
            console.log(data);
            // missing fields
            if (data.errors) {
              let errors = data.errors;
              this.missingFeildsErrosObject = errors;
            }
            // field not valid
            else if (data[0].description) {
              // show toast from ngx-toastr
              this.toastr.error(data[0].description, 'Login Failed');
            }
          });
        } else {
          return;
        }
      })
  }
}

