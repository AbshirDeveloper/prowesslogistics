import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { LoadsComponent } from './loads/loads.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ReportsComponent } from './reports/reports.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    LoadsComponent,
    DispatchComponent,
    AccountsComponent,
    ReportsComponent,
    DeductionsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
