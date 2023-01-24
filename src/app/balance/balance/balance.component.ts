import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fetchBalance, SetMonth } from 'src/app/states/balance.actions';
import { BalanceState } from 'src/app/states/balance.state';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Select(BalanceState.balance) balance: Observable<any>
  @Select(BalanceState.headers) headers: Observable<any>

  @Dispatch() navigate = (id: string, url: string) => []
  // @Dispatch() navigate = (id: string, url: string) => [new SetMonth(id), new Navigate([url])]
  @Dispatch() fetch = () => [new fetchBalance()]
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public parser: SheetParserService, public router: Router) { 
    this.filterSelectObj = [
      {
        name: 'Id',
        columnProp: 'id',
        options: []
      },
      {
        name: 'Fecha',
        columnProp: 'fecha',
        options: []
      },
    ]
  }
  filterValues: any = {};
  dataSource = new MatTableDataSource();
  displayedColumns: any[] = ['id', 'fecha', 'actions'];
  filterSelectObj: any[] = []
  bill = null;
  actions = ['form_response_edit_url']
  months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  createData = {
    title: 'Nueva nota',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfeGdqRXHaEbvMvDDNP8NqzDONlErU-xQJlchOFJvHdHwtKgg/viewform?embedded=true'
  }
  
  ngOnInit(): void {
    this.balance.subscribe(balance =>{
      this.dataSource.data = balance;
      this.dataSource.filterPredicate = this.createFilter();
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(balance, o.columnProp);
      });
    })
  }
  navigateMonth(e) {
    console.log(e.target.value);
    this.router.navigate(['balance', e.target.value], { skipLocationChange: false })
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
      console.log('The dialog was closed');
      this.fetch()
      

    });
  }
  
}
