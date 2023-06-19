import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './core/account/login/login.component';
import { RegistrationComponent } from './core/account/registration/registration.component';
import { ForgetPasswordComponent } from './core/account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './core/account/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './core/account/confirm-email/confirm-email.component';
import { ResourceDetailsComponent } from './components/resource/resource-details/resource-details.component';
import { BookingModule } from './components/booking/booking.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'service/:servicename', loadChildren: () => import('./components/service/service.module').then( (m) => m.ServiceModule ),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'ConfirmEmail', component: ConfirmEmailComponent, data: { queryParams: ['userId', 'token'] } },
  {path: 'resource' , loadChildren: () => import("./components/resource/resource.module").then(m=> m.ResourceModule) },
{path :'booking' , loadChildren:() => import("./components/booking/booking.module").then(m => BookingModule )},
  //core components
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },

  { path: 'resource/:id', component: ResourceDetailsComponent },
  // not found component
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
