import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpentsState } from 'src/app/states/spents.state';

@Component({
  selector: 'app-spent',
  templateUrl: './spent.component.html',
  styleUrls: ['./spent.component.scss']
})
export class SpentComponent implements OnInit {

  @Select(SpentsState.spent) spent: Observable<any>
  @Select(SpentsState.headers) headers: Observable<any>

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void { }

}
