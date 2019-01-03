import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
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
import { FilterPipe} from './utils/filter.pipe';
import { FilterDateEndPipe } from './utils/filter-date-end-pipe';
import { FilterDateStartPipe } from './utils/filter-date-start.pipe';
import { FilterLoadsPipe } from './utils/filter-loads.pipe';
import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule, } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    LoadsComponent,
    DispatchComponent,
    AccountsComponent,
    ReportsComponent,
    DeductionsComponent,
    HomeComponent,
    BankFeesComponent,
    ChargeBacksComponent,
    FilterPipe,
    FilterLoadsPipe,
    FilterDateStartPipe,
    FilterDateEndPipe,
    FilterPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
