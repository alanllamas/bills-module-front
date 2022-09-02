import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetParserService {

  constructor() { }

  headers: any;
  replaceChars(chars: any[], data: string) {
    return chars.length > 0 ? chars.reduce((acc, {find, replace}) => {acc = data.replaceAll(find, replace); return acc}, '') : data
  }
  // replacechars[1-2], url, indexheader, actions {action, key}
  parseData(values: any[], { chars, url, index, actions, use_index = false }: any) {
    const actionArray = actions.map(({action}:any) => action)
    // console.log('actionArray: ', actionArray);
    
    let headers: any[] = values[0]
    return {
      values: values.reduce((balanceacc: any[], balance: string[], i: number) => {
        if (i > 0) {
          if (balance.length > 0) {
            balanceacc = [...balanceacc, headers.slice().reduce((acc, curr, j) => {
              let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              let obj = {}
              let d =  balance[j]
              if (newcurr === 'form_response_edit_url') {
                
              //   console.log('headers: ', headers);
              //   console.log('newcurr: ', newcurr);
              //   console.log('actionArray.includes(newcurr): ', actionArray.includes(newcurr));
              //   console.log('balance: ', balance);
              // console.log('d: ', d);
              // console.log('actionArray.includes(newcurr) && !!d: ', actionArray.includes(newcurr) && !!d);
                
              }

              if (balance.includes("Terra Noble") && newcurr === index) d = 'Terra Noble ' + i;
              // if (!d) d = '0';
              // console.log(' ');
              // console.log(' ');
              // console.log(' ');
              // console.log('balance: ', balance);
              // console.log('i: ', i);
              // console.log('newcurr: ', newcurr);
              // console.log('d: ', d);
              // // d = 'Terra Noble ' + i; 
              // // console.log('d: ', d);
              // console.log('acc: ', acc);
              // console.log(' ');
              // console.log(' ');
              // console.log(' ');
              
              if (newcurr === index && d || newcurr === index && use_index) {
                const id = values.length - i;
                const finalURL =  use_index ? `${url}/${id}` : `${url}/${this.replaceChars(chars, d)}` ;
                Object.assign(obj, {[newcurr]: this.replaceChars(chars,d), url: finalURL, id})
               
                return {...acc, ...obj}
              } else if (actionArray.includes(newcurr) && !!d) {
                actions.map(({action, key}:any) => {
                  console.log(newcurr, action);
                  
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
        
        return balanceacc
        
      }, []),
      headers: this.headers
    }
  }
}
