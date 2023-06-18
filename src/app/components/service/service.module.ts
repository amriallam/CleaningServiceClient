import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { DetailsServiceComponent } from './details-service/details-service.component';


const routes : Routes = [
  {path: 'details/:id', component: DetailsServiceComponent}
];

@NgModule({
  declarations: [
    DetailsServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ServiceModule { }
