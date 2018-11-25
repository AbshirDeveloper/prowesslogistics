import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { LoadsComponent } from './loads/loads.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ReportsComponent } from './reports/reports.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'addressBook', component: AddressBookComponent},
  { path: 'loads', component: LoadsComponent},
  { path: 'dispatch', component: DispatchComponent},
  { path: 'accounts', component: AccountsComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'deductions', component: DeductionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
