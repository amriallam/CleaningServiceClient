import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAvailableResourceComponent } from './list-available-resource/list-available-resource.component';
import { BrowserModule } from '@angular/platform-browser';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { FormsModule } from '@angular/forms';

import { Routes , RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ListAvailableResourceComponent,data: { queryParams: ['serviceId', 'date','from','to'] }},
  {path:"details/:id",component: ResourceDetailsComponent}
]

@NgModule({
  declarations: [
    ListAvailableResourceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ResourceModule { }
