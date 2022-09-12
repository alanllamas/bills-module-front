import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsModule } from './bills/bills.module';
import { SpentsModule } from './spents/spents.module';
import { UtilsModule } from './utils/utils.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BalanceModule } from './balance/balance.module';
import { AuthModule } from './auth/auth.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './states/auth.state';
import { environment } from 'src/environments/environment';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { BillsState } from './states/bills.state';
import { MatButtonModule } from '@angular/material/button';
import { SpentsState } from './states/spents.state';
import { BalanceState } from './states/balance.state';
import { WarehouseState } from './states/warehouse.state';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { QrCodeModule } from 'ng-qrcode';
import { WarehouseModule } from './warehouse/warehouse.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([ AuthState, BillsState, SpentsState, BalanceState, WarehouseState ], {}),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({}),
    NgxsDispatchPluginModule.forRoot(),
    AuthModule,
    BillsModule,
    SpentsModule,
    UtilsModule,
    BalanceModule,
    WarehouseModule, 
    BrowserAnimationsModule,
    MatSidenavModule,
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token'],
    }),
    MatButtonModule,
    NgxScannerQrcodeModule,
    QrCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
