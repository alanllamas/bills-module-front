import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { combineLatestAll, forkJoin, Observable, of, tap } from 'rxjs';
import { BalanceService } from '../balance/balance.service';
import { fetchMonth, SetMonth } from '../states/balance.actions';
import { BalanceState } from '../states/balance.state';
import { SheetParserService } from '../utils/sheet-parser.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceResolverService {

  constructor(public balance: BalanceService,public parser: SheetParserService, public store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.dispatch([new fetchMonth(route.params['month'])])
  }
}
