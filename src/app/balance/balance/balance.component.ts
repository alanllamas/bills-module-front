import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      console.log('data: ', data);
      console.log('data.balance: ', data.balance);
      
    })
    console.log();
    
  }

}
