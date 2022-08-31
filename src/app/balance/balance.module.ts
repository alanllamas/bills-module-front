import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BalanceModule { }
