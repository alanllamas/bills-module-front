import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { SetBatchCode } from 'src/app/states/warehouse.actions';
import { WarehouseState } from 'src/app/states/warehouse.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.scss']
})
export class EntryDialogComponent implements OnInit {

  @Select(WarehouseState.users) users: Observable<any>
  @Select(WarehouseState.InMoves) entries: Observable<any>
  @Select(WarehouseState.MeasureUnits) measureUnits: Observable<any>
  @Select(WarehouseState.ProductList) productList: Observable<any>
  @Select(WarehouseState.Proveedores) providers: Observable<any>
  @Select(WarehouseState.Variants) variants: Observable<any>

  @Dispatch() setBatchcode = (product, variant, provider, date) => [new SetBatchCode(product, variant, provider, date)]

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    public store: Store
  ) {}
  url = `${environment.strapiURL}/api/product-inputs/`;

  today = new Date()
  formResults;
  newEntryForm = new FormGroup({
    producto: new FormControl(''),
    cantidad: new FormControl(''),
    fechaEntrada: new FormControl(this.today),
    fechaConsumo: new FormControl(''),
    fechaCaducidad: new FormControl(''),
    encargado: new FormControl(''),
    comentarios: new FormControl(''),
    variante: new FormControl(''),
    proveedor: new FormControl(''),
  })

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void { }

  formatDate(date) {
    const newFecha = new Date(date)
    const fechaFinal = `${newFecha.getDate() + 1}${newFecha.getMonth() + 1}${newFecha.getFullYear()}`
    // console.log(fechaFinal);
    return fechaFinal
  }


  PostForm() {
    this.entries.pipe(take(1)).subscribe(data => {
      this.formResults = data.newEntryForm.model
    })
    const { producto, cantidad, fechaEntrada, fechaConsumo, fechaCaducidad, encargado, comentarios, variante, proveedor } = this.formResults

    const request_data = {
        best_before_date: fechaConsumo,
        comments: comentarios,
        expiration_date: fechaCaducidad,
        input_date: fechaEntrada,
        quantity: cantidad,
        area_manager: encargado,
        variant: variante,
        product: producto,
        provider: proveedor,
    }
    console.log(request_data);

    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({ data: request_data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${environment.strapiToken}`
      }
    })
  }

}
