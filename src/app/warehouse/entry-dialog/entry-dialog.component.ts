import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.scss']
})
export class EntryDialogComponent implements OnInit {

  @Select(WarehouseState.InMoves) entries: Observable<any>
  @Select(WarehouseState.MeasureUnits) measureUnits: Observable<any>
  @Select(WarehouseState.ProductList) productList: Observable<any>

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router
  ) {}
  url = 'https://docs.google.com/forms/d/e/1FAIpQLScSRmuFfWfZ6ni4hv9u1-Hh8oNDMhk7ST4k3GrKFY7iyp5l9w/formResponse';

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
  })

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void { }

  formatDate(date) {
    const newFecha = new Date(date)
    const fechaFinal = `${newFecha.getMonth() + 1}/${newFecha.getDate() + 1}/${newFecha.getFullYear()}`
    // console.log(fechaFinal);
    return fechaFinal
  }

  PostForm() {
    this.entries.pipe(take(1)).subscribe(data => {
      this.formResults = data.newEntryForm.model
    })
    const { producto, cantidad, fechaEntrada, fechaConsumo, fechaCaducidad, encargado, comentarios } = this.formResults
    console.log('this.formResults: ', this.formResults);
    
    const fd = new FormData()
    fd.append('entry.1801376353', producto)
    fd.append('entry.633248458', cantidad)
    fd.append('entry.144156711', this.formatDate(fechaEntrada))
    fd.append('entry.485415790', this.formatDate(fechaConsumo))
    fd.append('entry.1623305401', this.formatDate(fechaCaducidad))
    fd.append('entry.1907831378', encargado)
    fd.append('entry.1808505957', comentarios)

    fetch(this.url, {
      method: 'POST',
      body: fd  
    })
  }





}
