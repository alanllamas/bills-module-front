import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance/balance.component';
import { BillComponent } from './bills/bill/bill.component';
import { BillsComponent } from './bills/bills/bills.component';
import { BalanceResolverService } from './resolvers/balance-resolver.service';
import { BillsResolverService } from './resolvers/bills-resolver.service';
import { SpentsResolverService } from './resolvers/spents-resolver.service';
import { SpentComponent } from './spents/spent/spent.component';
import { SpentsComponent } from './spents/spents/spents.component';

const routes: Routes = [
  {
    path: 'bills',
    component: BillsComponent,
    resolve: {
      bills: BillsResolverService
    }
  },
  {
    path: 'bills/:id',
    component: BillComponent,
    resolve: {
      bills: BillsResolverService
    }
  },
  {
    path: 'spents',
    component: SpentsComponent,
    resolve: {
      spents: SpentsResolverService
    }
  },
  {
    path: 'spents/:id',
    component: SpentComponent,
    resolve: {
      spents: SpentsResolverService
    }
  },
  {
    path: 'balance',
    component: BalanceComponent,
    resolve: {
      balance: BalanceResolverService
    }
  },
  {
    path: 'balance/:month',
    component: BalanceComponent,
    resolve: {
      balance: BalanceResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
