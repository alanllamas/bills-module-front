import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from './states/auth.actions';
import { AuthState } from './states/auth.state';
import { fetchBalance } from './states/balance.actions';
import { fetchBills } from './states/bills.actions';
import { fetchSpents } from './states/spents.actions';
import { fetchCategories, fetchInventory } from './states/warehouse.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Admin Itacate';
  @Select(AuthState.isLoggedIn) logged: Observable<boolean>

  @Dispatch() logout = () => new Logout()

  constructor(public store: Store) {}
  ngOnInit(): void {
    this.store.dispatch([
      new fetchBills(),
      new fetchSpents(),
      new fetchBalance(),
      new fetchInventory(),
      new fetchCategories(),
    ])
  }
  
}
