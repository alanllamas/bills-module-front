import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [  
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [  ]
})
export class UtilsModule { }
