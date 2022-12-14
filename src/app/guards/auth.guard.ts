import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/auth.state';
import { Logout } from '../states/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): (Observable<boolean> | Promise<boolean> | boolean) {
    const isLoggedIn: boolean = this.store.selectSnapshot(AuthState.isLoggedIn);

    if (!isLoggedIn) {
      this.store.dispatch(new Logout())
      this.router.navigate(['/', 'login']);
    }
    return isLoggedIn;
  }
}
