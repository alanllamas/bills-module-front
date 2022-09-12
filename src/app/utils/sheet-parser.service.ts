import { Injectable } from '@angular/core';
import { BillsService } from '../bills/bills.service';

@Injectable({
  providedIn: 'root'
})
export class SheetParserService {

  constructor(public billsService: BillsService) { }
 
  headers: any;
  values: any;
  replaceChars(chars: any[], data: string) {
    return chars.length > 0 ? chars.reduce((acc, {find, replace}) => {acc = data.replaceAll(find, replace); return acc}, '') : data
  }
  checktlacoyos (newcurr: string): number {
    let price = 0;
    switch (newcurr) {
      case 'docena':
        price = this.billsService.prices.tlacoyos.docena
        break;
      case 'media_docena':
        price = this.billsService.prices.tlacoyos.media_docena
        break;
      case 'pieza':
        price = this.billsService.prices.tlacoyos.pieza
        break;
    }

    return price
  }
  checkcomplementos (newcurr: string): number {
    let price = 0;
    switch (newcurr) {
      case 'nopales':
        price = this.billsService.prices.complementos.nopales
        break;
      case 'salsa_verde':
        price = this.billsService.prices.complementos.salsa
        break;
      case 'salsa_roja':
        price = this.billsService.prices.complementos.salsa
        break;
      case 'frijoles_refritos':
        price = this.billsService.prices.complementos.frijol
        break;
      case 'queso':
        price = this.billsService.prices.complementos.queso
        break;
    }
    return price
  }
  
  parseData(values: any[], { chars, url, index, actions, product_list = [], products = [] }: any): {values: any[], headers: any[]} {
    const actionArray = actions.map(({action}:any) => action)
    let headers: any[] = values[0]
    const finalData = {
      values: values.reduce((balanceacc: any[], balance: string[], i: number) => {
        let billTotal = 0;
        let productArray: any = [];
        if (i > 0) {
          if (balance.length > 0) {
            balanceacc = [...balanceacc, headers.slice().reduce((acc, curr, j) => {
              let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              let obj = {}
              let d =  balance[j]
              
              if (balance.includes("Terra Noble") && newcurr === index) d = 'Terra Noble ' + i;
              if (newcurr === 'id') {
  
                Object.assign(obj, {[newcurr]: d, url: `${url}/${d}`})
               
                return {...acc, ...obj}
              } 
              if (newcurr === index && d) {
                Object.assign(obj, {[newcurr]: this.replaceChars(chars,d)})
                return {...acc, ...obj}
              } else if (actionArray.includes(newcurr) && !!d) {
                actions.map(({action, key}:any) => {
                  
                  if (newcurr === action) {
                    Object.assign(obj, { [key]: d })
                  }
                })
                return {...acc, ...obj}
              } else if (product_list.includes(newcurr) && !!d) {
                const quantity = Number(d.replace(' Kg','').replace(' dzas', '').replace(' pzas', '').replace(' serv', '').trim())
                const pricetype = this.billsService.creditCustomers.includes(acc?.cliente) ? 'credit30' : 'default';
                const productKeys = Object.keys(products)
                const price = productKeys.reduce((acc, key) => {
                  acc = products[key].includes(newcurr)
                    ? key === 'tlacoyos'
                      ? this.checktlacoyos(newcurr)
                      : key === 'complementos'
                        ? this.checkcomplementos(newcurr)
                        : this.billsService.prices[key][pricetype]
                    : acc;
                    return acc
                }, 0);
  
                const product = {
                  label: newcurr,
                  quantity: d,
                  price,
                  total: Number(price * quantity)
                }
                billTotal = billTotal  + Number(product.total)
                productArray = [ ...productArray, product ]
                
              } else if (!curr.includes(22) && d) {
                Object.assign(obj, {[newcurr]: d})
                return {...acc, ...obj}
              }
              if (j === headers.length - 1) {
                
              }
              const missingObjs = 10 - productArray.length;
              const emptydata = {
                label: 'data',
                quantity: '',
                price: 0,
                total: 0
              }
              const empty = new Array(missingObjs === -1 ? 10 : missingObjs).fill(emptydata)
  
              Object.assign(acc, { products: [...productArray, ...empty], billTotal })
              // console.log('acc: ', acc);
              
              return acc
            }, {})]
          }
        } else {
          let arr = []
          this.headers = headers.reduce((acc, curr, j) => {
            if (!curr.includes(22)) {
              
              let obj = {}
              let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              arr = [...arr, newcurr]
              Object.assign(obj, {[newcurr]: balance[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
              return {...acc, ...obj}
            }
            return acc
            
          }, {})
          
          headers = arr
        }
        // console.log('balanceacc: ', balanceacc);
        
        return balanceacc
        
      }, []),
      headers: this.headers
    }
    // console.log('values: ', this.values);
    // console.log('finalData: ', finalData);
    
    return {...finalData}
  }
}
