import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from '../../core/account/login/login.component';
import { RegistrationComponent } from '../../core/account/registration/registration.component';
import { ForgetPasswordComponent } from '../../core/account/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../core/account/reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule
  ]
})
export class AccountModule { }
