import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { combineLatestAll, forkJoin, tap } from 'rxjs';
import { BalanceService } from '../balance/balance.service';
import { SheetParserService } from '../utils/sheet-parser.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceResolverService {

  constructor(public balance: BalanceService,public parser: SheetParserService) { }

  
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const config = {
      actions: [{action:'form_response_edit_url', key: 'edit'}],
      chars:  [{ find: '/', replace: '-'}],
      url: 'balance',
      index: 'fecha'
    }
    const month = route.params['month']
    
    if (month) {
      
      const [first, ...rest ] : string = month 
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
        tap(({balanceA, balanceB, income, outcome}: any) => console.log(`BEFORE MAP: `, [...this.parser.parseData(balanceA.values, config), ...this.parser.parseData(balanceB.values, config)].filter(data => data.cantidad !== undefined))))
      
    }
    return {}
    // return this.balance.getForm("Historial de caja!B1:N").pipe(tap((data: any) => console.log(this.parseData(data.values))))
  }
}
