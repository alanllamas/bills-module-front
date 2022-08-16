import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { BillsService } from '../bills/bills.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleResolverService implements Resolve<any> {
  headers: any = {}

  constructor(public bills: BillsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.bills.getForm()
    // .subscribe((data:any) => {
    //   const headers:any[] = data.values[0]
      
    //   return {
    //     headers,
    //     data: data.values.reduce((billacc: any[], bill: string[], i: number) => {
    //       if (i > 0) {
            
    //         billacc = [...billacc, headers.reduce((acc, curr, j) => {
              
    //           let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    //           let obj = {}
    //           Object.assign(obj, {[newcurr]: bill[j]})
    //           return {...acc, ...obj}
    //         }, {})]
    //       } else {
    //         this.headers = headers.reduce((acc, curr, j) => {
              
    //           let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    //           let obj = {}
    //           Object.assign(obj, {[newcurr]: bill[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
    //           return {...acc, ...obj}
    //         }, {})
    //         console.log('this.headers: ', this.headers);
            
    //       }
    //       return billacc
          
    //     }, [])
    //   }
    // } );
  }
}
