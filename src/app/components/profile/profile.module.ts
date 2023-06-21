import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';   
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
            SideNavComponent,
            InfoComponent,
            EditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class ProfileModule { }
