import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';
import { Select } from '@ngxs/store';
import { BillsState } from 'src/app/states/bills.state';
import { Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { fetchBills, SetBill } from 'src/app/states/bills.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  @Select(BillsState.bills) bills: Observable<any>
  @Select(BillsState.bills) headersObs: Observable<any>

  @Dispatch() navigate = (id: string, url: string) => [new SetBill(id), new Navigate([url])]
  @Dispatch() fetch = () => [new fetchBills()]

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public parser: SheetParserService) { 
    this.filterSelectObj = [
      {
        name: '# Nota',
        columnProp: 'numero_de_nota',
        options: []
      },
      {
        name: 'Id',
        columnProp: 'id',
        options: []
      },
      {
        name: 'Cliente',
        columnProp: 'cliente',
        options: []
      },
      {
        name: 'Fecha',
        columnProp: 'fecha',
        options: []
      },
      {
        name: 'Status de pago',
        columnProp: 'status_de_pago',
        options: []
      },
    ]
  }
  filterValues: any = {};
  dataSource = new MatTableDataSource();
  headers: any = {}
  displayedColumns: any[] = [ 'id' ,'numero_de_nota','cliente','fecha','status_de_pago', 'actions'];
  filterSelectObj: any[] = []

  createData = {
    title: 'Nueva nota',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSezaDkzOMKpkR5A2K17n8XfbNPiEee4zM9wKesraR_rn0kpRA/viewform?embedded=true'
  }
  
  ngOnInit(): void {
    this.headersObs.subscribe(headers => {
      this.headers = headers

    })
    this.bills.subscribe(bills =>{
      this.dataSource.data = bills;
      this.dataSource.filterPredicate = this.createFilter();
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(bills, o.columnProp);
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
        return data[col].toString().toLowerCase()
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            found = searchTerms[col].trim().toLowerCase() == checkData(data, col)
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
      console.log('The dialog was closed');
      this.fetch()
    });
  }

}
