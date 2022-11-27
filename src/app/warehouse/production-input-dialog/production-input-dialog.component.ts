import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';

@Component({
  selector: 'app-production-input-dialog',
  templateUrl: './production-input-dialog.component.html',
  styleUrls: ['./production-input-dialog.component.scss']
})
export class ProductionInputDialogComponent implements OnInit {

  @Select(WarehouseState.OutMoves) exits: Observable<any>
  @Select(WarehouseState.ProdLog) ProductionLog: Observable<any>
  @Select(WarehouseState.ProdInput) ProductionInput: Observable<any>

  @Output() addedProduct = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfL_AQSQWtWp20qbnwAL36MgcsvIpCrcIScPrgPvMlfU5uRlQ/formResponse';

  today = new Date()
  formResults;
  newInputForm = new FormGroup({
    id: new FormControl(''),
    codigo_salida: new FormControl(''),
    codigo_lote: new FormControl(''),
    cantidad: new FormControl(''),
  })
  filteredLog: any;
  filteredExits: any;
  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void {
    this.ProductionLog.pipe(tap((data) => {
      // console.log(data);
      const newData = {headers: data.headers, log: data.log.filter(log => log['terminado/caducado'] === 'FALSE')}
      this.filteredLog = newData
    })).subscribe()
    this.exits.pipe(tap((data) => {
      // console.log(data);
      const newData = {headers: data.headers, out_moves: data.out_moves.filter(move => move['terminado'] === 'FALSE')}
      this.filteredExits = newData
    })).subscribe()
  }

  formatDate(date) {
    const newFecha = new Date(date)
    const fechaFinal = `${newFecha.getMonth() + 1}/${newFecha.getDate() + 1}/${newFecha.getFullYear()}`
    // console.log(fechaFinal);
    return fechaFinal
  }

  PostForm() {
    
    this.ProductionInput.pipe(take(1)).subscribe(data => {
      console.log('data inner: ', data);
      
      this.formResults = data.newInputForm.model
      
    })
    const { codigo_salida, codigo_lote, cantidad, id } = this.formResults
    console.log('this.formResults: ', this.formResults);
    console.log('this.data: ', this.data);
    // this.addedProduct.emit(this.formResults)
    this.data.output(this.formResults)
    const fd = new FormData()
    fd.append('entry.209570367', id)
    fd.append('entry.1920569277', codigo_salida)
    fd.append('entry.1082898406', codigo_lote)
    fd.append('entry.525820220', cantidad)
    
    fetch(this.url, {
      method: 'POST',
      body: fd  
    })
    this.dialogRef.close();
  }

}
