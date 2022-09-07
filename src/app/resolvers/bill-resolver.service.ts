import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BillsService } from '../bills/bills.service';
import { SetBill } from '../states/bills.actions';
import { BillsState } from '../states/bills.state';

@Injectable({
  providedIn: 'root'
})
export class BillResolverService implements Resolve<any> {
  @Select(BillsState.bills) bills: Observable<any>;
  constructor(public store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.bills.subscribe(bills => {
      if (bills) {
        this.store.dispatch([new SetBill(route.params['id'])])
      }
    })
    return {}
  }
}
