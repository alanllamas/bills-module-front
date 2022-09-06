import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';


export class AuthStateModel {
  token: any;
  expirationTime: Date;
  refreshToken: any;
  validToken: boolean | null
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    expirationTime: null,
    refreshToken: null,
    validToken: null
  }
})

@Injectable()
export class AuthState {

  constructor(private store: Store) { }


  @Selector()
  static getToken(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static isExpired(state: AuthStateModel): any {
    if (state.expirationTime) {
      return new Date(new Date().getTime() + (5 * 60000)) > state.expirationTime      
    }
    return null
  }

  @Action(AuthActions.SetToken)
  setToken({ patchState, dispatch }: StateContext<AuthStateModel>, { token, expirationTime, refreshToken }: AuthActions.SetToken) {
    patchState({
      token,
      expirationTime: new Date(expirationTime),
      refreshToken
    });
    dispatch([new Navigate(['/'])])
  }


  @Action(AuthActions.Logout)
  logout({ patchState, dispatch }: StateContext<AuthStateModel>) {
    patchState({
      token: null,
      expirationTime: null,
      refreshToken: null
    });
    dispatch(new Navigate(['login']));
  }
  
}
