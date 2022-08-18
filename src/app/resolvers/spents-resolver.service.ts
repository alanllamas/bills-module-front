import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SpentsService } from '../spents/spents.service';


@Injectable({
  providedIn: 'root'
})
export class SpentsResolverService implements Resolve<any> {
 
  constructor(public spents: SpentsService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.spents.getForm()
    
  }
}
