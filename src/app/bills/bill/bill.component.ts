import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BillsState } from 'src/app/states/bills.state';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @Select(BillsState.bill) bill: Observable<any>
  @Select(BillsState.headers) headers: Observable<any>

  constructor() { }
  ngOnInit(): void { }
  
}
