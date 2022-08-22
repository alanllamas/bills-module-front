import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { SpentDialogComponent } from '../spent-dialog/spent-dialog.component';

@Component({
  selector: 'app-spents',
  templateUrl: './spents.component.html',
  styleUrls: ['./spents.component.scss']
})
export class SpentsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public dialog: MatDialog) { }
  headers: any = {}
  spents:any = {}
  columnsToDisplay = [
    'numero_de_comprobante',
    'proveedor',
    'fecha_de_egreso',
    'status_de_pago',
    'monto_total',
    'metodo_de_pago',
    'concepto',
  ];


  ngOnInit(): void {
    this.spents = this.route.snapshot.data["spents"]

    const headers:any[] = this.spents.values[0]

    this.spents = this.spents.values.reduce((spentacc: any[], spent: string[], i: number) => {
      if (i > 0) {
        
        spentacc = [...spentacc, headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  spent[j]
          
          if (newcurr === 'comprobante' && d) {
            
            Object.assign(obj, {[newcurr]: d})
            Object.assign(obj, {url: `spents/${this.spents.values.length - i}`, id: this.spents.values.length - i})
          } else {

            Object.assign(obj, {[newcurr]: d})
          }
          return {...acc, ...obj}
        }, {})]
        return spentacc
        
      } else {
        this.headers = headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          Object.assign(obj, {[newcurr]: spent[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
          return {...acc, ...obj}
        }, {})
        
        return spentacc
      }
      
    }, []);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SpentDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
