import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormDialogComponent } from 'src/app/utils/form-dialog/form-dialog.component';
import { SheetParserService } from 'src/app/utils/sheet-parser.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public parser: SheetParserService) { 
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
    
    const config = {
      actions: [{action:'form_response_edit_url', key: 'edit'}],
      chars:  [{ find: '# ', replace: ''}],
      url: 'bills',
      index: 'numero_de_nota'
    }
    const parsedData = this.parser.parseData( this.route.snapshot.data["bills"].values, config)
    this.headers = parsedData.headers
    this.bills = parsedData.values
      .filter((bill: any) => bill.fecha)
    
    
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
    });
  }

}
