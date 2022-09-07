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
import { BillResolverService } from './resolvers/bill-resolver.service';
import { SpentResolverService } from './resolvers/spent-resolver.service';
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
    canActivate: [AuthGuard]
  },
  {
    path: 'bills/:id',
    component: BillComponent,
    resolve: {
      bills: BillResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'spents',
    component: SpentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'spents/:id',
    component: SpentComponent,
    resolve: {
      spents: SpentResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'balance',
    component: BalanceComponent,
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
