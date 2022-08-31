import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BalanceService } from '../balance/balance.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceResolverService {

  constructor(public balance: BalanceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if () {
      
    // }
    const [first, ...rest ] : string = route.params['month'] 
    const month = `${first.toUpperCase()}${rest.join('')}`
    console.log('month: ', month);
    return this.balance.getForm('Agosto')
    
  }
}
