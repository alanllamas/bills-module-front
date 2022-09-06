import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BalanceComponent } from './balance/balance/balance.component';
import { MonthComponent } from './balance/month/month.component';
import { BillComponent } from './bills/bill/bill.component';
import { BillsComponent } from './bills/bills/bills.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { BalanceResolverService } from './resolvers/balance-resolver.service';
import { BillsResolverService } from './resolvers/bills-resolver.service';
import { SpentsResolverService } from './resolvers/spents-resolver.service';
import { SpentComponent } from './spents/spent/spent.component';
import { SpentsComponent } from './spents/spents/spents.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'bills',
    component: BillsComponent,
    resolve: {
      bills: BillsResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'bills/:id',
    component: BillComponent,
    resolve: {
      bills: BillsResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'spents',
    component: SpentsComponent,
    resolve: {
      spents: SpentsResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'spents/:id',
    component: SpentComponent,
    resolve: {
      spents: SpentsResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'balance',
    component: BalanceComponent,
    resolve: {
      balance: BalanceResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'balance/:month',
    component: MonthComponent,
    resolve: {
      month: BalanceResolverService
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
