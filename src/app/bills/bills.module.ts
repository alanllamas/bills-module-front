import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BillComponent } from './bill/bill.component';
import { BrowserModule } from '@angular/platform-browser';
import { BillsComponent } from './bills/bills.component';
import { NgxPrintModule } from 'ngx-print';
import { UtilsModule } from '../utils/utils.module';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { BillDialogComponent } from './bill-dialog/bill-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    BillComponent,
    BillsComponent,
    BillDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxPrintModule,
    UtilsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ],
  exports:[
    BillComponent
  ]
})
export class BillsModule { }
