import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/core/services/reset-password.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private resetPasswordService: ResetPasswordService
  ) {
    this.resetPasswordForm = new FormGroup({
      Token: new FormControl('', {
        validators: [Validators.required],
      }),
      Email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      }),
      Password: new FormControl('', {
        validators: [Validators.required],
      }),
      ConfirmedPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  // resetPassword() {
  //   if (this.resetPasswordForm.valid) {
  //     this.resetPasswordService
  //       .resetPassword(
  //         this.resetPasswordForm.value.token,
  //         this.resetPasswordForm.value.email,
  //         this.resetPasswordForm.value.password,
  //         this.resetPasswordForm.value.confirmPassowrd
  //       )
  //       .subscribe((response) => {
  //         console.log(response);
  //         this.toastr.success('Password Reset Successfully');
  //       });
  //   } else {
  //     console.log(this.resetPasswordForm.status)
  //     this.toastr.error('Please fill all the required fields');
  //   }
  // }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.toastr.error('Please fill in all the required fields.', 'Error');
      return;
    }

    // const email = this.resetPasswordForm.get('Email')?.value;
    // const password = this.resetPasswordForm.get('Password')?.value;
    // const token = (this.resetPasswordForm.value.Token);
    // const email = JSON.stringify(this.resetPasswordForm.value.Email);
    // const password = (this.resetPasswordForm.value.Password);
    const token = this.resetPasswordForm.value.Token;
    const email = this.resetPasswordForm.value.Email;
    const password = this.resetPasswordForm.value.Password;

    this.resetPasswordService
      .resetPassword(token, email, password)
      .subscribe((response) => {
        console.log(response);
        
        // Handle success response
        console.log('Password reset successful!', response);
        this.toastr.success('Password reset successful!');
      });
  }
}
