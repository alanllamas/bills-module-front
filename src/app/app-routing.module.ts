import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bills/bill/bill.component';
import { BillsComponent } from './bills/bills/bills.component';
import { GoogleResolverService } from './resolvers/google-resolver.service';

const routes: Routes = [
  {
    path: 'bills',
    component: BillsComponent,
    resolve: {
      bills: GoogleResolverService
    }
  },
  {
    path: 'bills/:id',
    component: BillComponent,
    resolve: {
      bills: GoogleResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
