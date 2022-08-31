import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-spents',
  templateUrl: './spents.component.html',
  styleUrls: ['./spents.component.scss']
})
export class SpentsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public dialog: MatDialog) { 
    this.filterSelectObj = [
      {
        name: '# Comprobante',
        columnProp: 'numero_de_comprobante',
        options: []
      },
      {
        name: 'Proveedor',
        columnProp: 'proveedor',
        options: []
      },
      {
        name: 'Fecha',
        columnProp: 'fecha_de_egreso',
        options: []
      },
      {
        name: 'Status de pago',
        columnProp: 'status_de_pago',
        options: []
      },
      {
        name: 'Monto Total',
        columnProp: 'monto_total',
        options: []
      },
      {
        name: 'Metodo de pago',
        columnProp: 'metodo_de_pago',
        options: []
      },
      {
        name: 'Concepto',
        columnProp: 'concepto',
        options: []
      },
    ]
  }
  filterSelectObj: any[] = []
  headers: any = {}
  spents:any = {}
  displayedColumns = [
    'numero_de_comprobante',
    'proveedor',
    'fecha_de_egreso',
    'status_de_pago',
    'monto_total',
    'metodo_de_pago',
    'concepto',
    'actions'
  ];
  actions = ['form_response_edit_url']

  createData = {
    title: 'Nuevo gasto',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSe4a6LQnbcnUcvJR8I-2bCWR2dbAUxf6-PYCktsZNe4K7KknQ/viewform?embedded=true'
  }
  editData = {
    title: 'Editar gasto',
    url:  ''
  }

  filterValues: any = {};
  dataSource = new MatTableDataSource();


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
          } else if (this.actions.includes(newcurr) && d) {
            let actions = {
              edit: ''
            }
            switch (newcurr) {
              case 'form_response_edit_url':
                  actions['edit'] = d
                break;
            }
            // const actions = {
            //   edit: d
            // }
            Object.assign(obj, { actions })
          } else  {

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
      
    }, []).filter((spent: any) => spent.fecha_de_egreso );


    this.dataSource.data = this.spents;
    this.dataSource.filterPredicate = this.createFilter();
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.spents, o.columnProp);
    });
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      let checkData = (data: any, col: string) => {

        
        // console.log(data['numero_de_nota']);
        // console.log(typeof data[col]);
        // console.log(data[col]);
        const res = data[col].toString().toLowerCase()
        // console.log(res);
        
        return res
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            found = searchTerms[col].trim().toLowerCase() ==  checkData(data, col)
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

 
  getFilterObject(fullObj:any, key : string) {
    const uniqChk: any[] = [];
    fullObj.filter((obj:any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  filterChange(filter: { columnProp: string }, event :any) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '700px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

}
