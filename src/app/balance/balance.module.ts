import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';



@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilsModule
  ]
})
export class BalanceModule { }
