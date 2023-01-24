import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';
import { environment } from 'src/environments/environment';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent implements OnInit {

  @Select(WarehouseState.OutMoves) exits: Observable<any>
  @Select(WarehouseState.users) users: Observable<any>

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    public warehouseService: WarehouseService,
    public store: Store
  ) {}
  url = `${environment.strapiURL}/api/product-outputs/`;
  today = new Date()
  formResults;
  newExitForm = new FormGroup({
    batch_code: new FormControl(''),
    requester: new FormControl(''),
    comments: new FormControl(''),
    authorized_by: new FormControl(''),
    output_date: new FormControl(this.today),
    quantity: new FormControl(0),
    request_area: new FormControl(''),
    output_reason: new FormControl(''),
  })
  output_reasons = [
    'Producción',
    'Venta',
    'Pruebas',
    'Merma',
  ]
  request_areas = [
    'Nixtamal',
    'Molino',
    'Tortilla',
    'Totopo',
    'Empaque',
    'Laboratorio',
  ]

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void { }

  
  PostForm() {
    
    this.exits.pipe(take(1)).subscribe(data => {
      const { model } = data.newExitForm
      const inmoves = this.store.selectSnapshot(WarehouseState.InMoves)
      const { id } = inmoves.in_moves.filter(inmove => inmove.attributes.batch_code === model.batch_code)[0]
      this.warehouseService.postStrapi(this.url, {...model, batch_code: Number(id)})
    })
  }
  getData(e) {
    if (e) {
      // console.log(e);
      this.newExitForm.controls.batch_code.setValue(e)
      // this.output = e
    }
  }
}
