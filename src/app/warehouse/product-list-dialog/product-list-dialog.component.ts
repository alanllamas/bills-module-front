import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';

@Component({
  selector: 'app-product-list-dialog',
  templateUrl: './product-list-dialog.component.html',
  styleUrls: ['./product-list-dialog.component.scss']
})
export class ProductListDialogComponent implements OnInit {

 @Select(WarehouseState.OutMoves) exits: Observable<any>
 @Select(WarehouseState.MeasureUnits) measureUnits: Observable<any>
 @Select(WarehouseState.Proveedores) proveedores: Observable<any>
 @Select(WarehouseState.Warehouses) warehouses: Observable<any>
 @Select(WarehouseState.Categories) categories: Observable<any>
 @Select(WarehouseState.ProductList) prodList: Observable<any>


 constructor(
   public dialogRef: MatDialogRef<any>,
   public router: Router,
 ) {}
 url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdXYowk6t_l86IREMCbyRECu4JXmT6wivqNW9TI-3CX6Yxg2A/formResponse';

 today = new Date()
 formResults;
 filteredCategories;
 fullCategories
 newProductForm = new FormGroup({
   producto: new FormControl(''),
   unidad_de_medida: new FormControl(''),
   proveedor: new FormControl(''),
   almacen: new FormControl(''),
   categoria: new FormControl(''),
   stock_minimo: new FormControl(''),
   tiempo_de_entrega_dias_naturales: new FormControl(''),
   caducidad_minima_dias: new FormControl(''),
   caracteristicas_de_almacenamiento: new FormControl(''),
 })
 
 

 onNoClick(): void {
   this.dialogRef.close();
   this.router.navigate([], {skipLocationChange: true})
 }

 ngOnInit(): void {
  this.categories.pipe(take(1)).subscribe((data) => {
    this.fullCategories = data.categories
    this.filteredCategories =  this.filterCategories(data.categories)
  })
  this.newProductForm.valueChanges.subscribe(data => {
    this.filteredCategories =  this.filterCategories(this.fullCategories)
  })
 }
 filterCategories(categories) {
  return categories.filter(category => category.almacen === this.newProductForm.controls.almacen.value)
 }

 formatDate(date) {
   const newFecha = new Date(date)
   const fechaFinal = `${newFecha.getMonth() + 1}/${newFecha.getDate() + 1}/${newFecha.getFullYear()}`
   // console.log(fechaFinal);
   return fechaFinal
 }

 PostForm() {
   this.prodList.pipe(take(1)).subscribe(data => {
     this.formResults = data.newProductForm.model
   })
   const {  producto, unidad_de_medida, proveedor, almacen, categoria, stock_minimo, tiempo_de_entrega_dias_naturales, caducidad_minima_dias, caracteristicas_de_almacenamiento, 
   } = this.formResults
   const fd = new FormData()
   fd.append('entry.2108438511', producto)
   fd.append('entry.1342615307', unidad_de_medida)
   fd.append('entry.436104813', proveedor)
   fd.append('entry.522533887', almacen)
   fd.append('entry.610134269', categoria)
   fd.append('entry.618598884', stock_minimo)
   fd.append('entry.2052608399', tiempo_de_entrega_dias_naturales)
   fd.append('entry.1683183597', caducidad_minima_dias)
   fd.append('entry.2098930376', caracteristicas_de_almacenamiento)

   fetch(this.url, {
     method: 'POST',
     body: fd  
   })
 }

 }
