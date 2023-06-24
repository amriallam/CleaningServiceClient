import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './core/account/login/login.component';
import { RegistrationComponent } from './core/account/registration/registration.component';
import { EmailVerfiySentComponent } from './core/account/email-verfiy-sent/email-verfiy-sent.component';
import { ForgetPasswordComponent } from './core/account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './core/account/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './core/account/confirm-email/confirm-email.component';
// import { BookingModule } from './components/booking/booking.module';
import { DetailsServiceComponent } from './components/service/details-service/details-service.component';
import { FaqComponent } from './shared/components/faq/faq.component';
import { UnderMaintenanceComponent } from './shared/components/under-maintenance/under-maintenance.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'service/:servicename', component: DetailsServiceComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'faq', component: FaqComponent },

  { path: 'email-sent', component: EmailVerfiySentComponent },
  { path: 'ConfirmEmail', component: ConfirmEmailComponent, data: { queryParams: ['userId', 'token'] } },
  { path: 'resource', loadChildren: () => import("./components/resource/resource.module").then(m => m.ResourceModule) }, //1 , 1.1
  { path: 'booking', loadChildren: () => import("./components/booking/booking.module").then(m => m.BookingModule) }, //2

  { path: "profile", loadChildren: () => import("./components/profile/profile.module").then(m => m.ProfileModule) },

  //core components
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  {path:'maintenance',component: UnderMaintenanceComponent},

  // not found component
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
