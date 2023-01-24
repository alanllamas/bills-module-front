import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BalanceState } from 'src/app/states/balance.state';
import { SetSpent } from 'src/app/states/spents.actions';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  @Select(BalanceState.month) month: Observable<any>

  
  @Dispatch() navigate = (url: string) => [new Navigate([url])]

  constructor(public route: ActivatedRoute, public parser: SheetParserService, public router: Router, public dialog: MatDialog) { }


  
  balanceData = {
    title: 'Nuevo cierre de caja',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfn4wP57jW1sNp-CzZG-WKDq_u23aVhR0_OdABHa9d4pk_QSQ/viewform?embedded=true'
  }
  dateData = {
    title: 'Modificar fecha',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSceb9ogtE2QpxqTLQR5Lxs0XXsnva5P7i2iB_yI6TLKFrYo_w/viewform?embedded=true'
  }
  editBalanceData = {
    title: 'Modificar cierre de caja',
    url:  ''
  }
  edit_balance;

  ngOnInit(): void {
    this.month.subscribe(month =>{
      if (month) {
        
        this.editBalanceData.url = month.edit_balance_url
      }
    })
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '700px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate([], {skipLocationChange: true})

    });
  }

}
