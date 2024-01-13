import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BillsState } from 'src/app/states/bills.state';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { fetchBills } from 'src/app/states/bills.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @Select(BillsState.bill) bill: Observable<any>
  @Select(BillsState.headers) headers: Observable<any>
  @Dispatch() fetch = () => [new fetchBills()]
  billData: any;

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void { 
    this.bill.subscribe(data => {
      this.billData = data
    })
  }

  openDialog(data: any): void {
    
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '700px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetch()
    });
  }
  
}
