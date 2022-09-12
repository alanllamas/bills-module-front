import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WarehouseState } from 'src/app/states/warehouse.state';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  @Select(WarehouseState.ProductList) products: Observable<any[]>
  constructor() { }
  output
  ngOnInit(): void {
  }
  getData(e) {
    if (e) {
      console.log(e);
      
      this.output = e
    }
  }

}
