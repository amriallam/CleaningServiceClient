import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HtmlDecoderPipe } from './pipes/htmlparse.pipe';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbDatepickerModule,
    FormsModule
  ],
  providers:[HtmlDecoderPipe],
  exports: []
})
export class SharedModule { }
