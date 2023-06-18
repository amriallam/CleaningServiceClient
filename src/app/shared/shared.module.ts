import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [HomeComponent, LoginComponent, ForgetPasswordComponent, RegistrationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbDatepickerModule,
    FormsModule
  ],
  exports: []
})
export class SharedModule { }
