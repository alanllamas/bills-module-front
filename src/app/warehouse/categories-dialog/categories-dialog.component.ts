import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';

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
 ) {}
 url = 'https://docs.google.com/forms/d/e/1FAIpQLSfqPXp_g2QPNDu1EAgXcew7423zx_-AZjik34pEUHOj9MkHxg/formResponse';

 today = new Date()
 formResults;
 newCategoryForm = new FormGroup({
   almacen: new FormControl(''),
   categoria: new FormControl(''),
   descripcion: new FormControl(''),
 })

 onNoClick(): void {
   this.dialogRef.close();
   this.router.navigate([], {skipLocationChange: true})
 }

 ngOnInit(): void { }

 PostForm() {
   this.categories.pipe(take(1)).subscribe(data => {
     this.formResults = data.newCategoryForm.model
   })
   const { almacen, categoria, descripcion } = this.formResults
   const fd = new FormData()
   fd.append('entry.420658761', categoria)
   fd.append('entry.1003790157', descripcion)
   fd.append('entry.1964191951', almacen)

   fetch(this.url, {
     method: 'POST',
     body: fd  
   })
 }


}
