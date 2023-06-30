import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { EmailVerfiySentComponent } from './account/email-verfiy-sent/email-verfiy-sent.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './account/confirm-email/confirm-email.component';
import { CreateTicketsComponent } from '../components/create-tickets/create-tickets.component';

// import { BookingModule } from './components/booking/booking.module';
import { DetailsServiceComponent } from '../components/service/details-service/details-service.component';
import { UnderMaintenanceComponent } from '../components/under-maintenance/under-maintenance.component';
import { FaqComponent } from '../components/faq/faq.component';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthgaurdsGuard } from '../Guards/authguards.gaurd';

const routes: Routes = [
  // Main
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'service/:servicename', component: DetailsServiceComponent },
  { path: 'resource', loadChildren: () => import("../components/resource/resource.module").then(m => m.ResourceModule) },
  { path: 'booking', loadChildren: () => import("../components/booking/booking.module").then(m => m.BookingModule) },
  { path: 'faq', component: FaqComponent },
  { path: 'support-tickets', component: CreateTicketsComponent, canActivate: [AuthgaurdsGuard] },
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
  { path: "profile", loadChildren: () => import("../components/profile/profile.module").then(m => m.ProfileModule) },

  // Not Found
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
