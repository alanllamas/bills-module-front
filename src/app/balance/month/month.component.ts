import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  constructor(public route: ActivatedRoute, public parser: SheetParserService, public router: Router, public dialog: MatDialog) { }

  headers: any = {}
  month:any = {}
  monthLabel = this.route.snapshot.data["month"].month
  totals = []

  
  balanceData = {
    title: 'Nuevo cierre de caja',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfn4wP57jW1sNp-CzZG-WKDq_u23aVhR0_OdABHa9d4pk_QSQ/viewform?embedded=true'
  }
  dateData = {
    title: 'Modificar fecha',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSe_5mAXOs_pCVLKyVGRl3Vvj6oGx8c_rhktd7SB3po3paeN3w/viewform?edit2=2_ABaOnudX-FCg0mDinFV3-CvqhY2v8JDnKC-ea_tBAGyA6yO0xe8DtwHIphBgOzbSxw'
  }
  

  ngOnInit(): void {
    console.log(this.route.snapshot.data["month"]);
    
    
    const config = {
      actions: [{action:'form_response_edit_url', key: 'edit'}],
      chars:  [{ find: '/', replace: '-'}],
      url: 'balance',
      index: 'fecha'
    }
    const configConfig = {
      actions: [{action:'form_response_edit_url', key: 'edit'}],
      chars:  [{ find: '/', replace: '-'}],
      url: 'balance',
      index: 'fecha'
    }
    
    
    const parsedData = this.parser.parseData( this.route.snapshot.data["month"].balanceA?.values, config)
    const parsedData2 = this.parser.parseData( this.route.snapshot.data["month"].balanceB?.values, config)
    const configData = this.parser.parseData( this.route.snapshot.data["month"].config?.values, configConfig)




    this.totals = configData.values.reduce((acc, curr) => {
      if (!curr.fecha_inicial.includes(22)) {
        acc = [...acc, {
          key : curr.fecha_inicial,
          value : curr.fecha_final
        }]
      } else {
        acc = [
          ...acc,
          {
            key : 'Fecha inicial',
            value : curr.fecha_inicial
          },
          {
            key : 'Fecha final',
            value : curr.fecha_final
          },
        ]
      }
      return acc
    }, [])
    
    this.headers = parsedData.headers
    
    this.month = [...parsedData2.values, ...parsedData.values]
      .reduce((acc, curr) => {
        if (!curr.cantidad) {
          const { denominacion, total } = curr
          acc.results = [ ...acc.results, { label: denominacion, value: total } ]
        } else {
          const { denominacion, total, cantidad } = curr
          acc.balance = [ ...acc.balance, { label: denominacion, value: total, quantity: cantidad } ]
        }
        return acc
      }, { balance: [], results: [] })
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
