import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';
import { environment } from 'src/environments/environment';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-measurement-unit-dialog',
  templateUrl: './measurement-unit-dialog.component.html',
  styleUrls: ['./measurement-unit-dialog.component.scss']
})
export class MeasurementUnitDialogComponent implements OnInit {

  @Select(WarehouseState.MeasureUnits) units: Observable<any>


  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    public warehouseService: WarehouseService
  ) {}
  url = `${environment.strapiURL}/api/measurement-units/`;

  today = new Date()
  formResults;
  newMeasureUnitsForm = new FormGroup({
    unit: new FormControl(''),
    abbreviation_single: new FormControl(''),
    abbreviation_plural: new FormControl(''),
  })

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void { }

  PostForm() {
    this.units.pipe(take(1)).subscribe(data => {
      const { model } =  data.newMeasureUnitsForm
      this.formResults = model
      this.warehouseService.postStrapi(this.url, model)
    })
  }

}
