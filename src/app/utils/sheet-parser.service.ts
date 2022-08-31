import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetParserService {

  constructor() { }

  headers: any;
  replaceChars(chars: any[], data: any) {
    chars.reduce((acc, {find, replace}) => {acc = data.replace(find, replace); return acc}, '')
  }
  // replacechars[1-2], url, indexheader, actions {action, key}
  parseData(values: any[], { chars, url, index, actions, use_index = false }: any) {
    const actionArray = actions.map(({action}:any) => action)
    console.log('actionArray: ', actionArray);
    
    const headers: any[] = values[0]
    return values.reduce((balanceacc: any[], bill: string[], i: number) => {
      if (i > 0) {
        balanceacc = [...balanceacc, headers.slice().reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  bill[j]
          if (newcurr === index && d) {
            if (use_index) {
              Object.assign(obj, {[newcurr]: this.replaceChars(chars,d), url: `${url}/${values.length - i}}`, id:values.length - i})
            } else {

              Object.assign(obj, {[newcurr]: this.replaceChars(chars,d), url: `${url}/${this.replaceChars(chars, d)}`, id:values.length - i})
            }
            
            return {...acc, ...obj}
          } else if (actionArray.includes(newcurr) && d) {
            actions.map(({action, key}:any) => {
              if (newcurr === action) {
                Object.assign(obj, { [key]: d })
              }
            })
          } if (!curr.includes(22)) {
            Object.assign(obj, {[newcurr]: d})
            return {...acc, ...obj}
          }
          return acc
        }, {})]
      } else {
        this.headers = headers.reduce((acc, curr, j) => {
          if (!curr.includes(22)) {
            
            let obj = {}
            let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            Object.assign(obj, {[newcurr]: bill[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
            return {...acc, ...obj}
          }
          return acc
          
        }, {})
        console.log('headers: ', this.headers);
      }
      
      return balanceacc
      
    }, [])
  }
}
