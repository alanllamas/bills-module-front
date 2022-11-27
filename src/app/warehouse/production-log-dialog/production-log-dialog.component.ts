import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { fetchProductionInput } from 'src/app/states/warehouse.actions';
import { WarehouseState } from 'src/app/states/warehouse.state';
import { ProductionInputDialogComponent } from '../production-input-dialog/production-input-dialog.component';

@Component({
  selector: 'app-production-log-dialog',
  templateUrl: './production-log-dialog.component.html',
  styleUrls: ['./production-log-dialog.component.scss']
})
export class ProductionLogDialogComponent implements OnInit {

  @Select(WarehouseState.OutMoves) exits: Observable<any>
  @Select(WarehouseState.MeasureUnits) measureUnits: Observable<any>
  @Select(WarehouseState.ProductList) productList: Observable<any>
  @Select(WarehouseState.ProdLog) prodLog: Observable<any>
  @Select(WarehouseState.ProdInput) prodInput: Observable<any>
  @Select(WarehouseState.Escandallos) escandallos: Observable<any>
  @Select(WarehouseState.Colores) colores: Observable<any>

  @Dispatch() fetch = () => [fetchProductionInput]

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    public dialog: MatDialog
  ) {}
  url = 'https://docs.google.com/forms/d/e/1FAIpQLSfxyNGZx_3z874Lc8GrvyRvtGzbMZRcsAuNdhpqAFoKcJl1NA/formResponse';
  inputList = []

  today = new Date()
  formResults;
  newLogForm = new FormGroup({
    insumos: new FormControl(''),
    fecha: new FormControl(this.today),
    producto: new FormControl(''),
    variante: new FormControl(''),
    cantidad: new FormControl(''),
    responsable: new FormControl(''),
    comentarios: new FormControl(''),
  })
  
  
  createInput = {
    title: 'Nuevo insumo en produccion',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfxyNGZx_3z874Lc8GrvyRvtGzbMZRcsAuNdhpqAFoKcJl1NA/formResponse',
    today: this.today,
    output: (data) => {
      this.inputList.push(data)
      this.newLogForm.controls.insumos.setValue(this.inputList.map(data => data.id).join(','))
    }
    
  }

  openDialog(data: any, component = null): void {
    let block;
    switch (component) {
      case 'input':
        block = ProductionInputDialogComponent
        break;
    }
    const dialogInputRef = this.dialog.open(block, {
      width: '700px',
      data
    });
    dialogInputRef.afterClosed().subscribe(result => {
      console.log('The product input dialog was closed');
      this.fetch()
    });
   
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void {
    this.inputList = [];
  }

  formatDate(date) {
    const newFecha = new Date(date)
    const fechaFinal = `${newFecha.getMonth() + 1}/${newFecha.getDate() + 1}/${newFecha.getFullYear()}`
    // console.log(fechaFinal);
    return fechaFinal
  }

  PostForm() {
    this.prodLog.pipe(take(1)).subscribe(data => {
      this.formResults = data.newLogForm.model
    })
    const { insumos, fecha, producto, variante, cantidad, responsable, comentarios } = this.formResults
    const fd = new FormData()
    fd.append('entry.882063404', insumos)
    fd.append('entry.605961872', this.formatDate(fecha))
    fd.append('entry.605376519', producto)
    fd.append('entry.1376959526', variante)
    fd.append('entry.203740913', cantidad)
    fd.append('entry.355941656', responsable)
    fd.append('entry.1371259864', comentarios)
    
    fetch(this.url, {
      method: 'POST',
      body: fd  
    })
  }

}
