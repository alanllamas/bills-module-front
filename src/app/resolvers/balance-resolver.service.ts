import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { combineLatestAll, forkJoin, of, tap } from 'rxjs';
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
      const incomeRange = `${first.toUpperCase()}${rest.join('')}!B13:E`
      // console.log('incomeRange: ', incomeRange);
      const outcomeRange = `${first.toUpperCase()}${rest.join('')}!G13:J`
      // console.log('outcomeRange: ', outcomeRange);
      const configRange = `${first.toUpperCase()}${rest.join('')}!H1:I11`
      // console.log('configRange: ', configRange);
      const editRange = `${first.toUpperCase()}${rest.join('')}!AC3:AC4`
      // console.log('editRange: ', editRange);
      
      return forkJoin({
        balanceA: this.balance.getForm(balanceRangeA),
        balanceB: this.balance.getForm(balanceRangeB),
        income: this.balance.getForm(incomeRange),
        outcome: this.balance.getForm(outcomeRange),
        config: this.balance.getForm(configRange),
        edit_balance: this.balance.getForm(editRange),
        month: of(month)
      })
      
    }
    // return {}
    return this.balance.getForm("Historial de caja!B1:N")
    // .pipe(tap((data: any) => console.log(this.parser.parseData(data.values, config))))
  }
}
