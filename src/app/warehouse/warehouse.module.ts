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


@NgModule({
  declarations: [
    WarehouseComponent,
    ExitDialogComponent,
    EntryDialogComponent
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
