import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  constructor(public billsService: BillsService, public route: ActivatedRoute) { }

  bill_number = new FormControl('');
  customer = new FormControl('');
  sell_date = new FormControl('');
  shipping_cost = new FormControl('');
  total = new FormControl('');
  customer_type = new FormControl('');
  payment_method = new FormControl('');
  payment_period = new FormControl('');
  payment_status = new FormControl('');
  billsData:any;
  headers: any = {}
  bills:any = {}
  bill: any = {}
  product_list = [
  'masa_azul_kg',
  'masa_amarilla_kg',
  'masa_de_especialidad',
  'color_masa',
  'tortilla_azul_de_15_cm_dza',
  'tortilla_amarilla_de_15cm_dza',
  'tortilla_especialidad_15cm_dza',
  'color_tortilla_15',
  'tortilla_azul_12cm_dza',
  'tortilla_amarilla_12cm_dza',
  'tortilla_especialidad_12cm_dza',
  'color_tortilla_12',
  'tortilla_azul_10cm_dza',
  'tortilla_amarilla_10cm_dza',
  'tortilla_especialidad_10cm_dza',
  'color_tortilla_10',
  'sopes_(dz)',
  'docena',
  'media_docena',
  'pieza',
  'frijol',
  'haba',
  'chicharo',
  'chicharron',
  'requeson',
  'garbanzo',
  'frijoles_refritos',
  'nopales',
  'salsa_verde',
  'salsa_roja',
  'queso',
  'maiz_azul',
  'maiz_amarillo',
  'maiz_rosa',
  'maiz_negro',
  'maiz_rojo',
  'maiz_blanco',
  'afilado_de_piedras',
]

  prices = this.billsService.prices
  creditCustomers = this.billsService.creditCustomers
  
  ngOnInit(): void {
    this.bills = this.route.snapshot.data["bills"]
    const headers:any[] = this.bills.values[0]
    let products; 
    this.bill = this.bills.values.reduce((billacc: any[], bill: string[], i: number) => {
      if (i > 0) {
        
        billacc = [...billacc, headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  bill[j]
          if (newcurr === 'numero_de_nota' && d) {
            
            Object.assign(obj, {[newcurr]: d.replace('# ', '')})
          } else if (this.product_list.includes(newcurr)) {
            products =
            acc.products 
              ?  [... acc.products, {[newcurr]: d, key: newcurr}]
              :  [ {[newcurr]: d, key: newcurr} ]
            
            Object.assign(obj, { products })
          } else {

            Object.assign(obj, {[newcurr]: d})
          }
          return {...acc, ...obj}
        }, {})]
      } else {
        this.headers = headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          Object.assign(obj, {[newcurr]: bill[j].trim().replace('# ','').replace(/[\n]/g, ' ').normalize("NFD")})
          return {...acc, ...obj}
        }, {})
        
      }
      return billacc
      
    }, []).filter((bill: any) => bill.numero_de_nota === this.route.snapshot.params['id'])[0]    
  }

  printBill() {
    // const printContent = document.getElementById('note');
    // const WinPrint = window.open('', '', 'width=900,height=650');
    // WinPrint.document.write(printContent.innerHTML);
    // WinPrint.document.close();
    // WinPrint.focus();
    // WinPrint.print();
    // WinPrint.close();
    // print()
  }
  
}
