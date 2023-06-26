import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, children:[
    { path: 'info', component: EditComponent },
    { path: 'recent-activity', component: BookingComponent },
    
    { path: '', redirectTo :'info', pathMatch:"full" }
  ]
 },
 { path: 'booking-details/:id', component: BookingDetailsComponent }


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
