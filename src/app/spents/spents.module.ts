import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpentsComponent } from './spents/spents.component';
import { SpentComponent } from './spent/spent.component';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { SpentDialogComponent } from './spent-dialog/spent-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [
    SpentsComponent,
    SpentComponent,
    SpentDialogComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class SpentsModule { }
