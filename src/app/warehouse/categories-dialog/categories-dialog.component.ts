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
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {

 @Select(WarehouseState.Warehouses) warehouses: Observable<any>
 @Select(WarehouseState.Categories) categories: Observable<any>


 constructor(
   public dialogRef: MatDialogRef<any>,
   public router: Router,
   public warehouseService: WarehouseService
 ) {}
 url = `${environment.strapiURL}/api/warehouse-categories/`;

 today = new Date()
 formResults;
 newCategoryForm = new FormGroup({
  warehouse: new FormControl(''),
  category: new FormControl(''),
  description: new FormControl(''),
 })

 onNoClick(): void {
   this.dialogRef.close();
   this.router.navigate([], {skipLocationChange: true})
 }

 ngOnInit(): void { }

 PostForm() {
  this.categories.pipe(take(1)).subscribe(data => {
    const { model } =  data.newCategoryForm
    this.formResults = model
    this.warehouseService.postStrapi(this.url, model)
  })
 }


}
