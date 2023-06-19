import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from '../shared/components/contact-us/contact-us.component';
import { AboutUsComponent } from '../shared/components/about-us/about-us.component';


@NgModule({
  declarations: [HeaderComponent, NavbarComponent,HomeComponent,FooterComponent,ContactUsComponent,AboutUsComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RetryInterceptor,
    multi: true
  }],
  exports: [HeaderComponent, FooterComponent,NavbarComponent,HomeComponent]
})
export class CoreModule { }
