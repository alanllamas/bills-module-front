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
    new: string
  }
  warehouses: {
    headers: any[]
    warehouses: any[]
    new: string
  }
  measure_units: {
    headers: any[]
    measure_units: any[]
    new: string
  }
  product_list: {
    headers: any[]
    product_list: any[]
    new: string
  }
  in_moves: {
    headers: any[]
    in_moves: any[]
    new: string
  }
  out_moves: {
    headers: any[]
    out_moves: any[]
    new: string
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
      categories: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLSfqPXp_g2QPNDu1EAgXcew7423zx_-AZjik34pEUHOj9MkHxg/viewform?embedded=true'
    },
    warehouses: {
      headers: [],
      warehouses: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLSdhmU-JsJmIRQH4XQOwG-UBAyN_F9iUh7Sge_kXNb5WwGNwDg/viewform?embedded=true'
    },
    measure_units: {
      headers: [],
      measure_units: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScfQVVYlOfCjv3bZTmUmeyl_X50JA3dG54sZIC7Mo0lLTFdvw/viewform?embedded=true'
    },
    product_list: {
      headers: [],
      product_list: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLSdXYowk6t_l86IREMCbyRECu4JXmT6wivqNW9TI-3CX6Yxg2A/viewform?embedded=true'
    },
    in_moves: {
      headers: [],
      in_moves: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScSRmuFfWfZ6ni4hv9u1-Hh8oNDMhk7ST4k3GrKFY7iyp5l9w/viewform?embedded=true'
    },
    out_moves: {
      headers: [],
      out_moves: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScyG_hZnNpzviISUCiMNev0hqAFeT2ZEIT0HQE-BVWLns6uSg/viewform?embedded=true'
    }
  }
})

@Injectable()
export class WarehouseState {

  constructor(public warehouse: WarehouseService, public parser: SheetParserService) { }


  @Selector()
  static inventory(state: WarehouseStateModel): WarehouseStateModel["inventory"] {
    return state.inventory;
  }
  @Selector()
  static Categories(state: WarehouseStateModel): WarehouseStateModel["categories"] {
    return state.categories;
  }
  @Selector()
  static Warehouses(state: WarehouseStateModel): WarehouseStateModel["warehouses"] {
    return state.warehouses;
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

    const range = "'Categorias'!B1:F";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'categories',
            index: 'id',
          }
          console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const categories = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetCategories({ headers, categories }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetWarehouses)
  SetWarehouses({ patchState }: StateContext<WarehouseStateModel>, { warehouses }: WarehouseActions.SetWarehouses) {
    patchState({ warehouses })
  }
  @Action(WarehouseActions.fetchWarehouses)
  fetchWarehouses({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchWarehouses) {

    const range = "'Almacenes'!B1:F";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'warehouses',
            index: 'id',
          }
          console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const warehouses = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetWarehouses({ headers, warehouses }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetMeasurementUnits)
  SetMeasurementUnits({ patchState }: StateContext<WarehouseStateModel>, { measure_units }: WarehouseActions.SetMeasurementUnits) {
    patchState({ measure_units })
  }
  @Action(WarehouseActions.fetchMeasurementUnits)
  fetchMeasurementUnits({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchMeasurementUnits) {

    const range = "'Unidades de medida'!B1:E";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'measure_units',
            index: 'id',
          }
          console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const measure_units = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetMeasurementUnits({ headers, measure_units }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetProductList)
  SetProductList({ patchState }: StateContext<WarehouseStateModel>, { product_list }: WarehouseActions.SetProductList) {
    patchState({ product_list })
  }
  @Action(WarehouseActions.fetchProductList)
  fetchProductList({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchProductList) {

    const range = "'Lista de productos'!B1:N";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'product_list',
            index: 'id',
          }
          console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const product_list = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetProductList({ headers, product_list }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetInMoves)
  SetInMoves({ patchState }: StateContext<WarehouseStateModel>, { in_moves }: WarehouseActions.SetInMoves) {
    patchState({ in_moves })
  }
  @Action(WarehouseActions.fetchInMoves)
  fetchInMoves({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchInMoves) {

    const range = "'Entradas'!B1:R";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'in_moves',
            index: 'id',
          }
          console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const in_moves = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetInMoves({ headers, in_moves }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetOutMoves)
  SetOutMoves({ patchState }: StateContext<WarehouseStateModel>, { out_moves }: WarehouseActions.SetOutMoves) {
    patchState({ out_moves })
  }
  @Action(WarehouseActions.fetchOutMoves)
  fetchOutMoves({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchOutMoves) {

    const range = "'Salidas'!B1:N";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'out_moves',
            index: 'id',
          }
          console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const out_moves = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetOutMoves({ headers, out_moves }))
        }
      )
    ).subscribe()

  }
}
