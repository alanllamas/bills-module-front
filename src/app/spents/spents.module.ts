import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpentsComponent } from './spents/spents.component';
import { SpentComponent } from './spent/spent.component';



@NgModule({
  declarations: [
    SpentsComponent,
    SpentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SpentsModule { }
