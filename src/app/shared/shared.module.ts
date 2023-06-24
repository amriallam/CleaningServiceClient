import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HtmlDecoderPipe } from './pipes/htmlparse.pipe';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';

@NgModule({
  declarations: [ LoginComponent, ForgetPasswordComponent, RegistrationComponent, NotFoundComponent, UnderMaintenanceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbDatepickerModule,
    FormsModule
  ],
  providers:[HtmlDecoderPipe],
  exports: []
})
export class SharedModule { }
