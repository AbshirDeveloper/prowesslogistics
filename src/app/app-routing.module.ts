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
import { BankFeesComponent } from './bank-fees/bank-fees.component';
import { ChargeBacksComponent } from './charge-backs/charge-backs.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'reroute', component: AddressBookComponent},
  { path: 'dashboard', component: HomeComponent},
  { path: 'assets', component: AddressBookComponent},
  { path: 'dispatch', component: LoadsComponent},
  { path: 'loadsOld', component: DispatchComponent},
  { path: 'loads', component: AccountsComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'deductions', component: DeductionsComponent,
children: [
      { path: '', component: DeductionsComponent },
      { path: 'bankFees', component: BankFeesComponent },
      { path: 'chargeBacks', component: ChargeBacksComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
