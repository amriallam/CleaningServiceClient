import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { NgbDatepicker, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from '../shared/components/contact-us/contact-us.component';
import { AboutUsComponent } from '../shared/components/about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerComponent } from './components/home/scheduler/scheduler.component';
import { Select2Module } from 'ng-select2-component';
import { FaqComponent } from '../shared/components/faq/faq.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    SchedulerComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    NgbDatepicker,
    FormsModule,
    Select2Module,
    NgxSkeletonLoaderModule,
  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RetryInterceptor,
    multi: true
  }],
  exports: [FooterComponent,NavbarComponent,HomeComponent]
})
export class CoreModule { }
