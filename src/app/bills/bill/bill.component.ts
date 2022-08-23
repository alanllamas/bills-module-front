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

  billsData:any;
  headers: any = {}
  bills:any = {}
  bill: any = {}
  product_list = [
    'masa_azul_kg',
    'masa_amarilla_kg',
    'masa_de_especialidad',
    'tortilla_azul_de_15_cm_dza',
    'tortilla_amarilla_de_15cm_dza',
    'tortilla_especialidad_15cm_dza',
    'tortilla_azul_12cm_dza',
    'tortilla_amarilla_12cm_dza',
    'tortilla_especialidad_12cm_dza',
    'tortilla_azul_10cm_dza',
    'tortilla_amarilla_10cm_dza',
    'tortilla_especialidad_10cm_dza',
    'sopes_(dz)',
    'docena',
    'media_docena',
    'pieza',
    // 'frijol',
    // 'haba',
    // 'chicharo',
    // 'chicharron',
    // 'requeson',
    // 'garbanzo',
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
  masa = [
    'masa_azul_kg',
    'masa_amarilla_kg',
    'masa_de_especialidad',
  ]
  maiz = [
    'maiz_azul',
    'maiz_amarillo',
    'maiz_rosa',
    'maiz_negro',
    'maiz_rojo',
    'maiz_blanco',
  ]
  tortilla = [
    'tortilla_azul_de_15_cm_dza',
    'tortilla_amarilla_de_15cm_dza',
    'tortilla_especialidad_15cm_dza',
    'tortilla_azul_12cm_dza',
    'tortilla_amarilla_12cm_dza',
    'tortilla_especialidad_12cm_dza',
    'tortilla_azul_10cm_dza',
    'tortilla_amarilla_10cm_dza',
    'tortilla_especialidad_10cm_dza',
  ]
  tlacoyos = [
    'docena',
    'media_docena',
    'pieza',
  ]
  complementos = [
    'frijoles_refritos',
    'nopales',
    'salsa_verde',
    'salsa_roja',
    'queso',
  ]
  sopes = [
    'sopes_(dz)',
  ]
  afilado = [
    'afilado_de_piedras',
  ]

  prices = this.billsService.prices
  creditCustomers = this.billsService.creditCustomers
  checktlacoyos (newcurr: string): number {
    // console.log(newcurr);
    let price = 0;
    switch (newcurr) {
      case 'docena':
        price = this.prices.tlacoyos.docena
        break;
      case 'media_docena':
        price = this.prices.tlacoyos.media_docena
        break;
      case 'pieza':
        price = this.prices.tlacoyos.pieza
        break;
    }

    return price
  }
  checkcomplementos (newcurr: string): number {
    // console.log(newcurr);
    let price = 0;
    switch (newcurr) {
      case 'nopales':
        price = this.prices.complementos.nopales
        break;
      case 'salsa_verde':
        price = this.prices.complementos.salsa
        break;
      case 'salsa_roja':
        price = this.prices.complementos.salsa
        break;
      case 'frijoles_refritos':
        price = this.prices.complementos.frijol
        break;
      case 'queso':
        price = this.prices.complementos.queso
        break;
    }
    return price
  }
  
  ngOnInit(): void {
    this.bills = this.route.snapshot.data["bills"]
    const headers:any[] = this.bills.values[0]
    this.bill = this.bills.values.reduce((billacc: any[], bill: string[], i: number) => {
      if (i > 0) {
        let products: any = [];
        let billTotal = 0;

        billacc = [...billacc, headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  bill[j]
          if (newcurr === 'numero_de_nota' && d) {
            
            Object.assign(obj, {[newcurr]: d.replace('# ', '')})
          } else if (this.product_list.includes(newcurr)) {
            if (d) {
              const quantity = Number(d.replace(' Kg','').replace(' dzas', '').replace(' pzas', '').trim())
              const pricetype = this.creditCustomers.includes(acc.cliente) ? 'credit30' : 'default'

              const newPrice = this.masa.includes(newcurr)
                ? this.prices.masa[pricetype]
                : this.tortilla.includes(newcurr)
                  ? this.prices.tortilla[pricetype]
                  : this.maiz.includes(newcurr)
                    ? this.prices.maiz[pricetype]
                    : this.sopes.includes(newcurr)
                      ? this.prices.sopes.default
                      : this.tlacoyos.includes(newcurr)
                        ? this.checktlacoyos(newcurr)
                        : this.complementos.includes(newcurr)
                          ? this.checkcomplementos(newcurr)
                          : 0;
              const price = newPrice
              const product = {
                label: newcurr,
                quantity: d,
                price,
                total: Number(price * quantity)
              }
              billTotal = billTotal  + product.total
              // console.log(billTotal);
              products = acc.products 
                ?  [... acc.products, product]
                :  [ product ]
        
              
              const emptyproducts = [...products]
              // console.log(empty);

              
              Object.assign(obj, { products: [...emptyproducts] })
            }
          } else {

            Object.assign(obj, {[newcurr]: d})
          }
          
          return {...acc, ...obj, billTotal}
        }, {})]
      } else {
        this.headers = headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          Object.assign(obj, {[newcurr]: bill[j].trim().replace('# ','').replace(/[\n]/g, ' ').normalize("NFD")})
          return {...acc, ...obj}
        }, {data:''})
        
      }
      return billacc
    }, []).filter((bill: any) => bill.numero_de_nota === this.route.snapshot.params['id'])[0]  
    const missingObjs = 10 - this.bill.products.length
    const emptydata = {
      label: 'data',
      quantity: '',
      price: 0,
      total: 0
    }

    const empty = new Array(missingObjs === -1 ? 10 : missingObjs).fill(emptydata)
    this.bill.products = [...this.bill.products, ...empty]
  }
  
}
