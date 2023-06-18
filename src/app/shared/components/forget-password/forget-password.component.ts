import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgetpasswordService } from 'src/app/core/services/forgetpassword.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  submitted:boolean = false;
  constructor(private forgetPasswordService: ForgetpasswordService, private toastr: ToastrService) {
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

  get email() {
    return this.forgetPasswordForm.controls['email'];
  }

  Submit() {
    if(this.forgetPasswordForm.invalid) return;
    this.submitted = true;
    this.forgetPasswordService
      .forgetPassword(this.forgetPasswordForm.value.email)
      .subscribe((res) => {
        this.submitted=false;
        this.toastr.success('Email sent successfully to ' + this.forgetPasswordForm.value.email);
      })
    this.toastr.success('Email sent successfully to ' + this.forgetPasswordForm.value.email);
  }
}
