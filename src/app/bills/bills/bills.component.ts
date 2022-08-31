import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';

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
      },
    ]
  }
  filterValues: any = {};
  dataSource = new MatTableDataSource();
  headers: any = {}
  bills:any = {}
  displayedColumns: any[] = ['numero_de_nota','cliente','fecha','status_de_pago', 'actions'];
  filterSelectObj: any[] = []
  bill = null;
  actions = ['form_response_edit_url']

  createData = {
    title: 'Nueva nota',
    url:  'https://docs.google.com/forms/d/e/1FAIpQLSezaDkzOMKpkR5A2K17n8XfbNPiEee4zM9wKesraR_rn0kpRA/viewform?embedded=true'
  }
  editData = {
    title: 'Editar nota',
    url:  ''
  }
  
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
          } else if (this.actions.includes(newcurr) && d) {
            switch (newcurr) {
              case 'form_response_edit_url':
                  Object.assign(obj, { edit: d })
                break;
            }
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
      
    }, []).filter((bill: any) => bill.fecha)
    
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
    });
  }

}
