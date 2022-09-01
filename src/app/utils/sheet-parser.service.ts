import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetParserService {

  constructor() { }

  headers: any;
  replaceChars(chars: any[], data: string) {
    return chars.reduce((acc, {find, replace}) => {acc = data.replaceAll(find, replace); return acc}, '')
  }
  // replacechars[1-2], url, indexheader, actions {action, key}
  parseData(values: any[], { chars, url, index, actions, use_index = false }: any) {
    const actionArray = actions.map(({action}:any) => action)
    // console.log('actionArray: ', actionArray);
    
    const headers: any[] = values[0]
    return {
      values: values.reduce((balanceacc: any[], balance: string[], i: number) => {
        if (i > 0) {
          if (balance.length > 0) {
            balanceacc = [...balanceacc, headers.slice().reduce((acc, curr, j) => {
              let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              let obj = {}
              const d =  balance[j]
              if (newcurr === index && d) {
                const id = values.length - i;
                const finalURL = use_index ? `${url}/${id}}` : `${url}/${this.replaceChars(chars, d)}`;
                Object.assign(obj, {[newcurr]: this.replaceChars(chars,d), url: finalURL, id})
               
                return {...acc, ...obj}
              } else if (actionArray.includes(newcurr) && d) {
                actions.map(({action, key}:any) => {
                  if (newcurr === action) {
                    Object.assign(obj, { [key]: d })
                  }
                })
                return {...acc, ...obj}
              } else if (!curr.includes(22) && d) {
                Object.assign(obj, {[newcurr]: d})
                return {...acc, ...obj}
              }
              return acc
            }, {})]
          }
        } else {
          this.headers = headers.reduce((acc, curr, j) => {
            if (!curr.includes(22)) {
              
              let obj = {}
              let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              Object.assign(obj, {[newcurr]: balance[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
              return {...acc, ...obj}
            }
            return acc
            
          }, {})
        }
        
        return balanceacc
        
      }, []),
      headers: this.headers
    }
  }
}
