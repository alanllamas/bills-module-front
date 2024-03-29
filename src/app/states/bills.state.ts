import { State, Action, StateContext, Selector } from '@ngxs/store';

import * as BillsActions from './bills.actions';
import { Injectable } from '@angular/core';
import { BillsService } from '../bills/bills.service';
import { SheetParserService } from '../utils/sheet-parser.service';
import { tap } from 'rxjs';


export class BillsStateModel {
  headers: any[]
  bills: any[]
  bill: any 
}

@State<BillsStateModel>({
  name: 'bills',
  defaults: {
    headers: [],
    bills: [],
    bill: null
  }
})

@Injectable()
export class BillsState {
  product_list = [
    'masa_azul_kg',
    'masa_amarilla_kg',
    'masa_de_especialidad',
    'tortilla_azul_de_15_cm_dza',
    'tortilla_amarilla_de_15cm_dza',
    'tortilla_especialidad_15cm_dza',
    'tortilla_azul_12cm_dza',
    'tortilla_amarilla_12cm_dza',
    'tortilla_especialidad_12cm_dza',
    'tortilla_azul_10cm_dza',
    'tortilla_amarilla_10cm_dza',
    'tortilla_especialidad_10cm_dza',
    'tortilla_azul_de_15_cm_kg',
    'tortilla_amarilla_de_15cm_kg',
    'tortilla_especialidad_15cm_kg',
    'tortilla_azul_14cm_kg',
    'tortilla_amarilla_14cm_kg',
    'tortilla_especialidad_14cm_kg',
    'tortilla_azul_12cm_kg',
    'tortilla_amarilla_12cm_kg',
    'tortilla_especialidad_12cm_kg',
    'tortilla_blanca_15cm_kg',
    'tortilla_blanca_14cm_kg',
    'tortilla_blanca_12cm_kg',
    'sopes_(dz)',
    'docena',
    'media_docena',
    'pieza',
    // 'frijol',
    // 'haba',
    // 'chicharo',
    // 'chicharron',
    // 'requeson',
    // 'garbanzo',
    'frijoles_refritos',
    'nopales',
    'salsa_verde',
    'salsa_roja',
    'queso',
    'maiz_azul',
    'maiz_amarillo',
    'maiz_rosa',
    'maiz_negro',
    'maiz_rojo',
    'maiz_blanco',
    'afilado_de_piedras',
    'pinole',
    "tortilla_azul_17cm_dza",
    "tortilla_amarilla_17cm_dza",
    "tortilla_especialidad_17cm_dza",
    "tortilla_azul_20cm_dza",
    "tortilla_amarilla_20cm_dza",
    "tortilla_especialidad_20cm_dza",
  ]
  products = {
    masa: [
      'masa_azul_kg',
      'masa_amarilla_kg',
      'masa_de_especialidad',
    ],
    maiz: [
      'maiz_azul',
      'maiz_amarillo',
      'maiz_rosa',
      'maiz_negro',
      'maiz_rojo',
      'maiz_blanco',
    ],
    tortilla: [
      'tortilla_azul_de_15_cm_dza',
      'tortilla_amarilla_de_15cm_dza',
      'tortilla_especialidad_15cm_dza',
      'tortilla_azul_12cm_dza',
      'tortilla_amarilla_12cm_dza',
      'tortilla_especialidad_12cm_dza',
      'tortilla_azul_10cm_dza',
      'tortilla_amarilla_10cm_dza',
      'tortilla_especialidad_10cm_dza',
    ],
    tlacoyos: [
      'docena',
      'media_docena',
      'pieza',
    ],
    complementos: [
      'frijoles_refritos',
      'nopales',
      'salsa_verde',
      'salsa_roja',
      'queso',
    ],
    sopes: [
      'sopes_(dz)',
    ],
    afilado_de_piedras: [
      'afilado_de_piedras',
    ],
    pinole: [
      'pinole'
    ],
    tortilla17: [
      "tortilla_azul_17cm_dza",
      "tortilla_amarilla_17cm_dza",
      "tortilla_especialidad_17cm_dza",
    ],
    tortilla20: [
      "tortilla_azul_20cm_dza",
      "tortilla_amarilla_20cm_dza",
      "tortilla_especialidad_20cm_dza",
    ],
    tortillaKg: [
      'tortilla_azul_de_15_cm_kg',
      'tortilla_amarilla_de_15cm_kg',
      'tortilla_especialidad_15cm_kg',
      'tortilla_azul_14cm_kg',
      'tortilla_amarilla_14cm_kg',
      'tortilla_especialidad_14cm_kg'
    ],
    tortillaKg12: [
      'tortilla_azul_12cm_kg',
      'tortilla_amarilla_12cm_kg',
      'tortilla_especialidad_12cm_kg',
    ],
    tortillaBlancaKg: [
      'tortilla_blanca_15cm_kg',
      'tortilla_blanca_14cm_kg',
    ],
    tortillaBlancaKg12: [
      'tortilla_blanca_12cm_kg'
    ],

  }
  constructor(public bills: BillsService, public parser: SheetParserService) { }


  @Selector()
  static headers(state: BillsStateModel): BillsStateModel["headers"] {
    return state.headers;
  }
  @Selector()
  static bills(state: BillsStateModel): BillsStateModel["bills"] {
    return state.bills;
  }
  @Selector()
  static bill(state: BillsStateModel): BillsStateModel["bill"] {
    return state.bill;
  }

  
  @Action(BillsActions.SetBills)
  setBills({ patchState }: StateContext<BillsStateModel>, { bills, headers }: BillsActions.SetBills) {
    patchState({ bills, headers })
  }
  @Action(BillsActions.fetchBills)
  fetchBills({ dispatch }: StateContext<BillsStateModel>, { }: BillsActions.fetchBills) {

    this.bills.getForm().pipe(
      tap(
        (billsData: any) => {
          
          const config = {
            actions: [{action:'form_response_edit_url', key: 'edit'}],
            chars:  [{ find: '# ', replace: ''}],
            url: 'bills',
            index: 'numero_de_nota',
            product_list: this.product_list,
            products: this.products,
          }
          const newBillsData = this.parser.parseData( billsData.values, config)
          console.log('newBillsData: ', newBillsData);
          newBillsData.values = newBillsData.values.filter((bill: any) => bill.fecha).sort((a, b) => b.id - a.id )
          dispatch(new BillsActions.SetBills(newBillsData.values, newBillsData.headers))
        }
      )
    ).subscribe()

  }
  @Action(BillsActions.SetBill)
  SetBill({ patchState, getState }: StateContext<BillsStateModel>, { id }: BillsActions.SetBill) {
    patchState({ bill: getState().bills.filter(bill => bill.id === id)[0] })
  }
  
}
