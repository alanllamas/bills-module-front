import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BillsService } from '../bills/bills.service';

@Injectable({
  providedIn: 'root'
})
export class BillsResolverService implements Resolve<any> {

  constructor(public bills: BillsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.bills.getForm()
    
  }
}
