import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fetchCategories, fetchInMoves, fetchInventory, fetchMeasurementUnits, fetchOutMoves, fetchProductList } from 'src/app/states/warehouse.actions';
import { WarehouseState } from 'src/app/states/warehouse.state';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  @Select(WarehouseState.ProductList) products: Observable<any[]>
  constructor(public dialog: MatDialog) { }
  @Dispatch() fetch = () => [new fetchCategories(), new fetchInMoves(), new fetchInventory(), new fetchMeasurementUnits(), new fetchOutMoves(),new fetchProductList()]
  output;
  today = new Date()

  createData = {
    title: 'Nueva nota',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfn4wP57jW1sNp-CzZG-WKDq_u23aVhR0_OdABHa9d4pk_QSQ/viewform?embedded=true',
    today: this.today
  }
  createEntry = {
    title: 'Nueva entrada',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfn4wP57jW1sNp-CzZG-WKDq_u23aVhR0_OdABHa9d4pk_QSQ/viewform?embedded=true',
    today: this.today
  }
  createExit = {
    title: 'Nueva salida',
    url:  'https://docs.google.com/forms/u/0/d/e/1FAIpQLScyG_hZnNpzviISUCiMNev0hqAFeT2ZEIT0HQE-BVWLns6uSg/viewform?embedded=true',
    today: this.today
  }
  ngOnInit(): void {
  }
  getData(e) {
    if (e) {
      console.log(e);
      
      this.output = e
    }
  }

   

  openDialog(data: any, component = null): void {
    let block;
    switch (component) {
      case 'exit':
        block = ExitDialogComponent
        break;
      case 'entry':
        block = EntryDialogComponent
        break;
    
      default:
        block = FormDialogComponent
        break;
      }
      const dialogRef = this.dialog.open(block, {
        width: '700px',
        data
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.fetch()
      });
   
  }

}
