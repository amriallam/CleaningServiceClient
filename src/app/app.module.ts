import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './core/account/account.module';
import { ResourceModule } from './components/resource/resource.module';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      tapToDismiss: true,
      preventDuplicates: true,
      closeButton: true,
      disableTimeOut: true,
    }),
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AccountModule,
    ResourceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
