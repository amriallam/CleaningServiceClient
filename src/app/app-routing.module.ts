import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
// import { ForgetPasswordComponent } from './shared/components/forget-password/forget-password.component';
// import { LoginComponent } from './shared/components/login/login.component';
// import { RegistrationComponent } from './shared/components/registration/registration.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AccountModule } from './core/account/account.module';
// Login and register components from account module
import { LoginComponent } from './core/account/login/login.component';
import { RegistrationComponent } from './core/account/registration/registration.component';
import { ForgetPasswordComponent } from './core/account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './core/account/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './core/account/confirm-email/confirm-email.component';
import { ResourceDetailsComponent } from './components/resource/resource-details/resource-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'service/:servicename',
    loadChildren: () =>
      import('./components/service/service.module').then(
        (m) => m.ServiceModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../app/core/account/account.module').then((m) => m.AccountModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'ConfirmEmail', component: ConfirmEmailComponent, data: { queryParams: ['userId', 'token'] } },

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
export class AppRoutingModule {}
