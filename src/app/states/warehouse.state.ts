import { State, Action, StateContext, Selector } from '@ngxs/store';

import * as WarehouseActions from './warehouse.actions';
import { Injectable } from '@angular/core';
import { SheetParserService } from '../utils/sheet-parser.service';
import { tap } from 'rxjs';
import { WarehouseService } from '../warehouse/warehouse.service';


export class WarehouseStateModel {
  inventory: {
    headers: any[]
    products: any[]
  }
  categories: {
    headers: any[]
    categories: any[]
  }
}

@State<WarehouseStateModel>({
  name: 'warehouse',
  defaults: {
    inventory: {
      headers: [],
      products: []
    },
    categories: {
      headers: [],
      categories: []
    },
  }
})

@Injectable()
export class WarehouseState {

  constructor(public warehouse: WarehouseService, public parser: SheetParserService) { }


  @Selector()
  static inventory(state: WarehouseStateModel): WarehouseStateModel["inventory"] {
    return state.inventory;
  }

  
  @Action(WarehouseActions.SetInventory)
  SetInventory({ patchState }: StateContext<WarehouseStateModel>, { inventory }: WarehouseActions.SetInventory) {
    patchState({ inventory })
  }
  @Action(WarehouseActions.fetchInventory)
  fetchInventory({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchInventory) {
    const range = "'Inventario'!B1:R";

    this.warehouse.getForm(range).pipe(
      tap(
        (inventoryData: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'inventory',
            index: 'id',
          }
          // console.log('inventoryData: ', inventoryData);
          const { headers, values} = this.parser.parseData( inventoryData.values, config)
          const products = values.filter((product: any) => product.codigo_producto).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetInventory({ headers, products }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetCategories)
  SetCategories({ patchState }: StateContext<WarehouseStateModel>, { categories }: WarehouseActions.SetCategories) {
    patchState({ categories })
  }
  @Action(WarehouseActions.fetchCategories)
  fetchCategories({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchCategories) {

    const range = "'Categorias'!B1:E";
    this.warehouse.getForm(range).pipe(
      tap(
        (categoryData: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'categories',
            index: 'id',
          }
          console.log('categoryData: ', categoryData);
          const { headers, values } = this.parser.parseData( categoryData.values, config)
          const categories = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetCategories({ headers, categories }))
        }
      )
    ).subscribe()

  }
}
