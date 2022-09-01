import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MonthComponent } from './month/month.component'
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BalanceComponent,
    MonthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    UtilsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class BalanceModule { }
