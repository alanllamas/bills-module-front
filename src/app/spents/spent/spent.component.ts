import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spent',
  templateUrl: './spent.component.html',
  styleUrls: ['./spent.component.scss']
})
export class SpentComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }
  headers: any = {}
  spents:any = {}
  spent:any = {}


  ngOnInit(): void {
    this.spents = this.route.snapshot.data["spents"]

    const headers:any[] = this.spents.values[0]

    this.spent = this.spents.values.reduce((spentacc: any[], spent: string[], i: number) => {
      if (i > 0) {
        
        spentacc = [...spentacc, headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          const d =  spent[j]
          
          if (newcurr === 'comprobante' && d) {
            
            Object.assign(obj, {[newcurr]: d})
            Object.assign(obj, {id: this.spents.values.length - i})
          } else {

            Object.assign(obj, {[newcurr]: d})
          }
          return {...acc, ...obj}
        }, {})]
        return spentacc
        
      } else {
        this.headers = headers.reduce((acc, curr, j) => {
          
          let newcurr = curr.toLowerCase().trim().replace(/[\n ]/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          let obj = {}
          Object.assign(obj, {[newcurr]: spent[j].trim().replace(/[\n]/g, ' ').normalize("NFD")})
          return {...acc, ...obj}
        }, {})
        
        return spentacc
      }
      
    }, []).filter((spent: any) => {      
      return spent.id == this.route.snapshot.params['id']
    })[0]
    
  }

}
