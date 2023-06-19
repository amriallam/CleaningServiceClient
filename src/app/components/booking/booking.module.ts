import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { FilterComponent } from './filter/filter.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookinListItemsComponent } from './bookin-list-items/bookin-list-items.component';
@NgModule({
  declarations: [
    FilterComponent,
    BookinListItemsComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    CalendarModule,
    FormsModule,
    DropdownModule, 
    ReactiveFormsModule
  ]
})
export class BookingModule { }
