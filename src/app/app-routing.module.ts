import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './core/components/home/home.component';
import { ForgetPasswordComponent } from './shared/components/forget-password/forget-password.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';

// import { AuthgaurdsGuard } from './shared/gaurds/authgaurds.guard';


const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: "service/:servicename", loadChildren: () => import("./components/service/service.module").then(m => m.ServiceModule) },
  { path: "booking", loadChildren: () => import("./components/booking/booking.module").then(m => m.BookingModule) },
  // {path:'schedule', component: FilterComponent},
  //accoont route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },

  //core components
  { path: "about", component: AboutUsComponent },
  { path: "contact", component: ContactUsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
