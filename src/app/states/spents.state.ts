import { State, Action, StateContext, Selector } from '@ngxs/store';

import * as SpentsActions from './spents.actions';
import { Injectable } from '@angular/core';
import { SpentsService } from '../spents/spents.service';
import { SheetParserService } from '../utils/sheet-parser.service';
import { tap } from 'rxjs';


export class SpentsStateModel {
  headers: any[]
  spents: any[]
  spent: any 
}

@State<SpentsStateModel>({
  name: 'spents',
  defaults: {
    headers: [],
    spents: [],
    spent: null
  }
})

@Injectable()
export class SpentsState {

  constructor(public spents: SpentsService, public parser: SheetParserService) { }


  @Selector()
  static headers(state: SpentsStateModel): SpentsStateModel["headers"] {
    return state.headers;
  }
  @Selector()
  static spents(state: SpentsStateModel): SpentsStateModel["spents"] {
    return state.spents;
  }
  @Selector()
  static spent(state: SpentsStateModel): SpentsStateModel["spent"] {
    return state.spent;
  }

  
  @Action(SpentsActions.SetSpents)
  setSpents({ patchState }: StateContext<SpentsStateModel>, { spents, headers }: SpentsActions.SetSpents) {
    patchState({ spents, headers })
  }
  @Action(SpentsActions.fetchSpents)
  fetchSpents({ dispatch }: StateContext<SpentsStateModel>, { }: SpentsActions.fetchSpents) {

    this.spents.getForm().pipe(
      tap(
        (spentsData: any) => {
          const config = {
            actions: [{action:'form_response_edit_url', key: 'edit'}],
            chars:  [],
            url: 'spents',
            index: 'fecha_de_egreso'
          }
          const newSpentsData = this.parser.parseData( spentsData.values, config)
          newSpentsData.values = newSpentsData.values.filter((spent: any) => spent.fecha_de_egreso).sort((a, b) => b.id - a.id )
          dispatch(new SpentsActions.SetSpents(newSpentsData.values, newSpentsData.headers))
        }
      )
    ).subscribe()

  }
  @Action(SpentsActions.SetSpent)
  SetSpent({ patchState, getState }: StateContext<SpentsStateModel>, { id }: SpentsActions.SetSpent) {
    patchState({ spent: getState().spents.filter(spent => spent.id === id)[0] })
  }
  
  
}
