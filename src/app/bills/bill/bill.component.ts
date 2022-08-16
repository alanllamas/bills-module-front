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
  product_list =[
    'afilado_de_piedras',
    'amarillas_12',
    'amarillas_14',
    'amarillas_15',
    'azules_12',
    'azules_14',
    'azules_15',
    'chicharo',
    'chicharron_prensado',
    'color',
    'docena',
    'especialidad_12',
    'especialidad_14',
    'especialidad_15',
    'frijol',
    'frijoles_refritos',
    'garbanzo',
    'haba',
    'maiz_amarillo',
    'maiz_azul',
    'maiz_blanco',
    'maiz_negro',
    'maiz_rojo',
    'maiz_rosa',
    'masa_amarilla',
    'masa_azul',
    'masa_especialidad',
    'nopales',
    'queso',
    'requeson',
    'salsa_roja',
    'salsa_verde',
    '1/2_docena',
    'pieza',
    'sopes_(dz)',
  ]

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
          if (newcurr === 'nota' && d) {
            
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
      
    }, []).filter((bill: any) => bill.nota === this.route.snapshot.params['id'])[0]    
  }
  
}
