import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, children:[
    { path: 'info', component: InfoComponent },
    { path: 'Edit', component: EditComponent },
    { path: '', redirectTo :'Edit', pathMatch:"full" }
  ] },


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
