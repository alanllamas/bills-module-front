import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSpent } from '../states/spents.actions';
import { SpentsState } from '../states/spents.state';


@Injectable({
  providedIn: 'root'
})
export class SpentResolverService implements Resolve<any> {
  @Select(SpentsState.spents) spents: Observable<any>;
  constructor(public store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spents.subscribe(spents => {
      if (spents) {
        this.store.dispatch([new SetSpent(route.params['id'])])
      }
    })
    return {}
  }
}
