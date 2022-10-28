import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';

@Component({
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent implements OnInit {

  @Select(WarehouseState.OutMoves) exits: Observable<any>

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router
  ) {}
  url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScyG_hZnNpzviISUCiMNev0hqAFeT2ZEIT0HQE-BVWLns6uSg/formResponse';
  today = new Date()
  formResults;
  newExitForm = new FormGroup({
    codigo: new FormControl(''),
    solicitante: new FormControl(''),
    comentarios: new FormControl(''),
    autoriza: new FormControl(''),
    fecha: new FormControl(this.today),
    cantidad: new FormControl(''),
    pide: new FormControl(''),
    razon: new FormControl(''),
  })
  

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }

  ngOnInit(): void { }

  PostForm() {
    this.exits.pipe(take(1)).subscribe(data => {
      this.formResults = data.newExitForm.model
    })
    const { codigo, solicitante, pide, cantidad, fecha, razon, autoriza, comentarios } = this.formResults
    const newFecha = new Date(fecha)
    const fechaFinal = `${newFecha.getDate() + 1}/${newFecha.getMonth() + 1}/${newFecha.getFullYear()}`
    console.log(fechaFinal);
    

    const fd = new FormData()
    fd.append('entry.1084783798', codigo.trim())
    fd.append('entry.1510680173', solicitante.trim())
    fd.append('entry.1906366635', pide.trim())
    fd.append('entry.57063566', cantidad)
    fd.append('entry.417287618', fechaFinal)
    fd.append('entry.589672308', razon.trim())
    fd.append('entry.1938458625', autoriza.trim())
    fd.append('entry.1536409263', comentarios.trim())

    fetch(this.url, {
      method: 'POST',
      body: fd  
    })
  }
  getData(e) {
    if (e) {
      console.log(e);
      this.newExitForm.controls.codigo.setValue(e)
      // this.output = e
    }
  }
}
