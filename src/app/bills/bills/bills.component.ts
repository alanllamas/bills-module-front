import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public dialog: MatDialog) { }
  headers: any = {}
  bills:any = {}


  columnsToDisplay = ['numero_de_nota','cliente','monto_total','fecha','status_de_pago',];

  ngOnInit(): void {
    this.bills = this.route.snapshot.data["bills"]
    
    const headers:any[] = this.bills.values[0]

    this.bills = this.bills.values.reduce((billacc: any[], bill: string[], i: number) => {
      if (i > 0) {
        
        billacc = [...billacc, headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  bill[j]
          if (newcurr === 'numero_de_nota' && d) {
            
            Object.assign(obj, {[newcurr]: d.replace('# ', '')})
            Object.assign(obj, {url: `bills/${d.replace('# ', '')}`})
          } else {

            Object.assign(obj, {[newcurr]: d})
          }
          return {...acc, ...obj}
        }, {})]
      } else {
        this.headers = headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          Object.assign(obj, {[newcurr]: bill[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
          return {...acc, ...obj}
        }, {})
      }
      return billacc
      
    }, []).filter((bill: any) => bill.numero_de_nota) 
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(BillDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
