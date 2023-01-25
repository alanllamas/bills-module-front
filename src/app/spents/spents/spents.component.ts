import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SpentsState } from 'src/app/states/spents.state';
import { fetchSpents, SetSpent } from 'src/app/states/spents.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-spents',
  templateUrl: './spents.component.html',
  styleUrls: ['./spents.component.scss']
})
export class SpentsComponent implements OnInit {
  @Select(SpentsState.spents) spents: Observable<any>
  @Select(SpentsState.headers) headers: Observable<any>

  @Dispatch() navigate = (id: string, url: string) => [new SetSpent(id), new Navigate([url])]
  @Dispatch() fetch = () => [new fetchSpents()]

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public parser: SheetParserService) { 
    this.filterSelectObj = [
      {
        name: 'Id',
        columnProp: 'id',
        options: []
      },
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
  displayedColumns = [
    'id',
    'numero_de_comprobante',
    'proveedor',
    'monto_total',
    'fecha_de_egreso',
    'metodo_de_pago',
    'concepto',
    'actions'
  ];
  actions = ['form_response_edit_url']

  createData = {
    title: 'Nuevo gasto',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSeoJnmuHZYx2bRVuV_g_Z71ORWV7FyqkdtTMxiW5PNYeTuWNg/viewform?embedded=true'
  }

  filterValues: any = {};
  dataSource = new MatTableDataSource();


  ngOnInit(): void {
    this.spents.subscribe(spents =>{
      this.dataSource.data = spents;
      this.dataSource.filterPredicate = this.createFilter();
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(spents, o.columnProp);
      });
    })
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
      this.fetch()
    });
  }

}
