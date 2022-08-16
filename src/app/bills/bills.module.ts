import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BillComponent } from './bill/bill.component';
import { BrowserModule } from '@angular/platform-browser';
import { BillsComponent } from './bills/bills.component';



@NgModule({
  declarations: [
    BillComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports:[
    BillComponent
  ]
})
export class BillsModule { }
