import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from './states/auth.actions';
import { AuthState } from './states/auth.state';
import { fetchBalance } from './states/balance.actions';
import { fetchBills } from './states/bills.actions';
import { fetchSpents } from './states/spents.actions';
import { fetchCategories, fetchColores, fetchEscandallos, fetchInMoves, fetchInventory, fetchMeasurementUnits, fetchOutMoves, fetchProductionInput, fetchProductionLog, fetchProductList, fetchProveedores, fetchUsers, fetchVariants, fetchWarehouses } from './states/warehouse.actions';


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
    this.logged.subscribe(data => {
      if (data) {
        this.store.dispatch([
          new fetchBills(),
          new fetchSpents(),
          new fetchBalance(),
          new fetchInventory(),
          new fetchCategories(),
          new fetchWarehouses(),
          new fetchMeasurementUnits(),
          new fetchProductList(),
          new fetchInMoves(),
          new fetchOutMoves(),
          new fetchProductionLog(),
          new fetchProductionInput(),
          new fetchProveedores(),
          new fetchEscandallos(),
          new fetchColores(),
          new fetchVariants(),
          new fetchUsers(),
        ])
      }
    })
  }
  
}
