import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { QrCodeModule } from 'ng-qrcode';


@NgModule({
  declarations: [
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    QrCodeModule,
    NgxScannerQrcodeModule
  ],
})
export class WarehouseModule { }
