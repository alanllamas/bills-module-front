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
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.scss']
})
export class WarehouseDialogComponent implements OnInit {
  @Select(WarehouseState.Warehouses) warehouses: Observable<any>
  @Select(WarehouseState.Categories) categories: Observable<any>


  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    public warehouseService: WarehouseService
  ) {}
  url = `${environment.strapiURL}/api/warehouses/`;
 
  today = new Date()
  formResults;
  newWarehouseForm = new FormGroup({
   title: new FormControl(''),
   location: new FormControl(''),
   specifications: new FormControl(''),
   warehouse_categories: new FormControl(''),
  })
 
  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }
 
  ngOnInit(): void { }
 
  PostForm() {
   this.warehouses.pipe(take(1)).subscribe(data => {
     const { model } =  data.newWarehouseForm
     this.formResults = model
     this.warehouseService.postStrapi(this.url, model)
   })
  }
}
