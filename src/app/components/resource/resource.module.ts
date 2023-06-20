import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResourceDetailsComponent
  ],
  imports: [
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
