import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAvailableResourceComponent } from './list-available-resource/list-available-resource.component';

import { Routes , RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ListAvailableResourceComponent}
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
