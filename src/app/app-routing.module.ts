import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/account/login/login.component';
import { RegistrationComponent } from './core/account/registration/registration.component';
import { EmailVerfiySentComponent } from './core/account/email-verfiy-sent/email-verfiy-sent.component';
import { ForgetPasswordComponent } from './core/account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './core/account/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './core/account/confirm-email/confirm-email.component';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';
import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SuccessComponent } from './components/success/success.component';
import { ErrorComponent } from './components/error/error.component';
import { CreateTicketsComponent } from './components/create-tickets/create-tickets.component';
import { AuthgaurdsGuard } from './Guards/authguards.gaurd';import { DetailsServiceComponent } from './components/service/details-service/details-service.component';


const routes: Routes = [
  // Main
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'service/:servicename', component: DetailsServiceComponent },
  {
    path: 'resource',
    loadChildren: () =>
      import('./components/resource/resource.module').then(
        (m) => m.ResourceModule
      ),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./components/booking/booking.module').then(
        (m) => m.BookingModule
      ),
  },
  { path: 'faq', component: FaqComponent },
  { path: 'support-tickets', component: CreateTicketsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'maintenance', component: UnderMaintenanceComponent },

  // Account
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'auth/resetPassword', component: ResetPasswordComponent },
  { path: 'email-sent', component: EmailVerfiySentComponent },
  { path: 'auth/ConfirmEmail', component: ConfirmEmailComponent, data: { queryParams: ['userId', 'token'] } },
  { path: "profile", loadChildren: () => import("./components/profile/profile.module").then(m => m.ProfileModule) },
  { path: "support-tickets", component: CreateTicketsComponent , canActivate: [AuthgaurdsGuard]},
  {path: 'success', component:SuccessComponent},
  {path: 'cancel', component:ErrorComponent},
  // Not Foudn
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
