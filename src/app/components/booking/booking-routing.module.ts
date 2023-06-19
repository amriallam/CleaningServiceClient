import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { BookinListItemsComponent } from './bookin-list-items/bookin-list-items.component';

const routes: Routes = [
  {'path':'filter' , component:FilterComponent},
  {'path':'bookingList' , component: BookinListItemsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
