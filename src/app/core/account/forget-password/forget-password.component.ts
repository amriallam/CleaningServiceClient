import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetpasswordService } from 'src/app/core/services/forgetpassword.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  constructor(
    private forgetPasswordService: ForgetpasswordService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      }),
    });
  }

  sendConfirmationEmail() {
    console.log(this.forgetPasswordForm.status);
    if (this.forgetPasswordForm.status == 'INVALID') {
      this.toastr.error('Please enter a valid email address');
      return;
    } else {
      this.forgetPasswordService
        .forgetPassword(this.forgetPasswordForm.value.email)
        .subscribe((res) => {
          console.log(res);
          console.log(this.forgetPasswordForm.value.email);

          this.toastr.success(
            'Email sent successfully to ' + this.forgetPasswordForm.value.email
          );
          this.toastr.info('Redirecting to reset password page');

          setTimeout(() => {
            this.router.navigate(['/resetPassword']);
          }, 2000);
        });
      this.toastr.success(
        'Email sent successfully to ' + this.forgetPasswordForm.value.email
      );
    }
  }
}
