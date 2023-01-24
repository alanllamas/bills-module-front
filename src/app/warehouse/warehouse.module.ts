import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { QrCodeModule } from 'ng-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EntryDialogComponent } from './entry-dialog/entry-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ProductListDialogComponent } from './product-list-dialog/product-list-dialog.component';
import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';
import { ProductionLogDialogComponent } from './production-log-dialog/production-log-dialog.component';
import { ProductionInputDialogComponent } from './production-input-dialog/production-input-dialog.component';
import { MeasurementUnitDialogComponent } from './measurement-unit-dialog/measurement-unit-dialog.component';
import { WarehouseDialogComponent } from './warehouse-dialog/warehouse-dialog.component';


@NgModule({
  declarations: [
    WarehouseComponent,
    ExitDialogComponent,
    EntryDialogComponent,
    ProductListDialogComponent,
    CategoriesDialogComponent,
    ProductionLogDialogComponent,
    ProductionInputDialogComponent,
    MeasurementUnitDialogComponent,
    WarehouseDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QrCodeModule,
    NgxScannerQrcodeModule,
    NgxsFormPluginModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class WarehouseModule { }
