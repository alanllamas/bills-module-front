import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
    constructor(public route: ActivatedRoute, public dialog: MatDialog, public parser: SheetParserService, public router: Router) { 
    this.filterSelectObj = [
      {
        name: 'Fecha',
        columnProp: 'fecha',
        options: []
      },
    ]
  }
  filterValues: any = {};
  dataSource = new MatTableDataSource();
  headers: any = {}
  balance:any = {}
  displayedColumns: any[] = ['fecha', 'actions'];
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
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSfn4wP57jW1sNp-CzZG-WKDq_u23aVhR0_OdABHa9d4pk_QSQ/viewform?embedded=true'
  }
  
  ngOnInit(): void {
    // this.balance = this.route.snapshot.data
    const config = {
      actions: [{action:'form_response_edit_url', key: 'edit'}],
      chars:  [{ find: '/', replace: '-'}],
      url: 'balance',
      index: 'fecha'
    }
    const parsedData = this.parser.parseData( this.route.snapshot.data["balance"].values, config)
    this.headers = parsedData.headers
    this.balance = parsedData.values
      .filter((balance: any) => balance.fecha)
      console.log('this.balance: ', this.balance);
    
    this.dataSource.data = this.balance;
    this.dataSource.filterPredicate = this.createFilter();
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.balance, o.columnProp);
    });
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
      this.router.navigate([], {skipLocationChange: true})

    });
  }
  
}
