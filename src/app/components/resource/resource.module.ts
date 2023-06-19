import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAvailableResourceComponent } from './list-available-resource/list-available-resource.component';

import { Routes , RouterModule } from '@angular/router';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';

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
    RouterModule.forChild(routes)
  ]
})
export class ResourceModule { }
