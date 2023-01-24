import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take, tap } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';
import { environment } from 'src/environments/environment';
import { WarehouseService } from '../warehouse.service';

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
 @Select(WarehouseState.Variants) variants: Observable<any>


 constructor(
   public dialogRef: MatDialogRef<any>,
   public router: Router,
   public warehouseService: WarehouseService

 ) {}
 url = `${environment.strapiURL}/api/product-lists/`;
 

 today = new Date()
 formResults;
 filteredCategories;
 fullCategories
 newProductForm = new FormGroup({
   product: new FormControl(''),
   measurement_unit: new FormControl(''),
   warehouse: new FormControl(''),
   warehouse_category: new FormControl(''),
   variants: new FormControl(''),
   minimum_stock: new FormControl(0),
   delivery_days: new FormControl(0),
   minimum_expiration: new FormControl(0),
   storage_specifications: new FormControl(''),
   product_code: new FormControl(''),
   comments: new FormControl(''),
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
  return categories.filter(category => category.almacen === this.newProductForm.controls.warehouse.value)
 }

 PostForm() {
  this.prodList.pipe(take(1)).subscribe(data => {
    const { model } =  data.newProductForm
    this.formResults = model
    this.warehouseService.postStrapi(this.url, model)
  })
 }

 }
