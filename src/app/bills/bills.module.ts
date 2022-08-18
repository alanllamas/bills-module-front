import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BillComponent } from './bill/bill.component';
import { BrowserModule } from '@angular/platform-browser';
import { BillsComponent } from './bills/bills.component';
import { NgxPrintModule } from 'ngx-print';
import { UtilsModule } from '../utils/utils.module';



@NgModule({
  declarations: [
    BillComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxPrintModule,
    UtilsModule
  ],
  exports:[
    BillComponent
  ]
})
export class BillsModule { }
