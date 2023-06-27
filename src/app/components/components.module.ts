import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng-select2-component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { SchedulerComponent } from './home/scheduler/scheduler.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';



@NgModule({
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    HomeComponent,
    NotFoundComponent,
    UnderMaintenanceComponent,
    SchedulerComponent,
    CreateTicketsComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbModule,
    ReactiveFormsModule,
    NgbDatepicker,
    FormsModule,
    Select2Module,
    NgxSkeletonLoaderModule,
    RouterModule
  ]
})
export class ComponentsModule { }
