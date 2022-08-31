import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { combineLatestAll, forkJoin, tap } from 'rxjs';
import { BalanceService } from '../balance/balance.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceResolverService {

  constructor(public balance: BalanceService) { }

  headers: any;
  
  parseData(values: any[]) {
    const headers: any[] = values[0]
    return values.reduce((billacc: any[], bill: string[], i: number) => {
      if (i > 0) {
        billacc = [...billacc, headers.slice().reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  bill[j]
          if (newcurr === 'numero_de_nota' && d) {
            
            Object.assign(obj, {[newcurr]: d.replace('# ', '')})
            Object.assign(obj, {url: `bills/${d.replace('# ', '')}`})
            return {...acc, ...obj}
          } else if (!curr.includes(22)) {
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
      
      return billacc
      
    }, [])
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if () {
      
    // }
    const [first, ...rest ] : string = route.params['month'] 
    const balanceRangeA = `${first.toUpperCase()}${rest.join('')}!B2:D11`
    // console.log('balanceRange: ', balanceRange);
    const balanceRangeB = `${first.toUpperCase()}${rest.join('')}!E2:G11`
    // console.log('balanceRange: ', balanceRange);
    const incomeRange = `${first.toUpperCase()}${rest.join('')}!B12:E`
    // console.log('incomeRange: ', incomeRange);
    const outcomeRange = `${first.toUpperCase()}${rest.join('')}!G12:J`
    // console.log('outcomeRange: ', outcomeRange);
    return forkJoin({
      balanceA: this.balance.getForm(balanceRangeA),
      balanceB: this.balance.getForm(balanceRangeB),
      income: this.balance.getForm(incomeRange),
      outcome: this.balance.getForm(outcomeRange),
    }).pipe(
      tap(({balanceA, balanceB, income, outcome}: any) => console.log(`BEFORE MAP: `, [...this.parseData(balanceA.values), ...this.parseData(balanceB.values)].filter(data => data.cantidad !== undefined))))
    
  }
}
