import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public dialog: MatDialog) { 
    this.filterSelectObj = [
      {
        name: '# Nota',
        columnProp: 'numero_de_nota',
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
      }
    ]
  }
  filterValues: any = {};
  dataSource = new MatTableDataSource();
  headers: any = {}
  bills:any = {}
  displayedColumns: any[] = ['numero_de_nota','cliente','fecha','status_de_pago',];
  filterSelectObj: any[] = []
  bill = null;


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
      this.dataSource.data = this.bills;
      this.dataSource.filterPredicate = this.createFilter();
      this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.bills, o.columnProp);
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

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            found = searchTerms[col].trim().toLowerCase() ==  data[col].toString().toLowerCase()
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

    // Called on Filter change
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

  
  openDialog(): void {
    const dialogRef = this.dialog.open(BillDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
