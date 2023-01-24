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
    newCategoryForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  warehouses: {
    headers: any[]
    warehouses: any[]
    new: string
    newWarehouseForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  variants: {
    variants: any[]
    newVariantForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  users: {
    users: any[]
  }
  measure_units: {
    headers: any[]
    measure_units: any[]
    new: string
    newMeasureUnitsForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  product_list: {
    headers: any[]
    product_list: any[]
    new: string
    newProductForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  in_moves: {
    headers: any[]
    in_moves: any[]
    new: string
    newEntryForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  out_moves: {
    headers: any[]
    out_moves: any[]
    new: string
    newExitForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  production_log: {
    headers: any[]
    log: any[]
    new: string
    newLogForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  production_input: {
    headers: any[]
    inputs: any[]
    new: string
    newId: string
    newInputForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  proveedores: {
    headers: any[]
    proveedores: any[]
    new: string
    newProveedorForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
  escandallos: {
    headers: any[]
    escandallos: any[]
  }
  colores: {
    headers: any[]
    colores: any[]
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
      new: 'https://docs.google.com/forms/d/e/1FAIpQLSfqPXp_g2QPNDu1EAgXcew7423zx_-AZjik34pEUHOj9MkHxg/viewform?embedded=true',
      newCategoryForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    users: {
      users: [],
    },
    warehouses: {
      headers: [],
      warehouses: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLSdhmU-JsJmIRQH4XQOwG-UBAyN_F9iUh7Sge_kXNb5WwGNwDg/viewform?embedded=true',
      newWarehouseForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    variants: {
      variants: [],
      newVariantForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    measure_units: {
      headers: [],
      measure_units: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScfQVVYlOfCjv3bZTmUmeyl_X50JA3dG54sZIC7Mo0lLTFdvw/viewform?embedded=true',
      newMeasureUnitsForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    product_list: {
      headers: [],
      product_list: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLSdXYowk6t_l86IREMCbyRECu4JXmT6wivqNW9TI-3CX6Yxg2A/viewform?embedded=true',
      newProductForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    in_moves: {
      headers: [],
      in_moves: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScSRmuFfWfZ6ni4hv9u1-Hh8oNDMhk7ST4k3GrKFY7iyp5l9w/viewform?embedded=true',
      newEntryForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    out_moves: {
      headers: [],
      out_moves: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScyG_hZnNpzviISUCiMNev0hqAFeT2ZEIT0HQE-BVWLns6uSg/viewform?embedded=true',
      newExitForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    production_log: {
      headers: [],
      log: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScSRmuFfWfZ6ni4hv9u1-Hh8oNDMhk7ST4k3GrKFY7iyp5l9w/viewform?embedded=true',
      newLogForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    production_input: {
      headers: [],
      inputs: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScSRmuFfWfZ6ni4hv9u1-Hh8oNDMhk7ST4k3GrKFY7iyp5l9w/viewform?embedded=true',
      newId: null,
      newInputForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    proveedores: {
      headers: [],
      proveedores: [],
      new: 'https://docs.google.com/forms/d/e/1FAIpQLScSRmuFfWfZ6ni4hv9u1-Hh8oNDMhk7ST4k3GrKFY7iyp5l9w/viewform?embedded=true',
      newProveedorForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    },
    escandallos: {
      headers: [],
      escandallos: [],
    },
    colores: {
      headers: [],
      colores: [],
    }
  }
})

@Injectable()
export class WarehouseState {

  constructor(public warehouse: WarehouseService, public parser: SheetParserService) { }


  @Selector()
  static users(state: WarehouseStateModel): WarehouseStateModel["users"] {
    return state.users;
  }
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
  @Selector()
  static Variants(state: WarehouseStateModel): WarehouseStateModel["variants"] {
    return state.variants;
  }
  @Selector()
  static MeasureUnits(state: WarehouseStateModel): WarehouseStateModel["measure_units"] {
    return state.measure_units;
  }
  @Selector()
  static ProductList(state: WarehouseStateModel): WarehouseStateModel["product_list"] {
    return state.product_list;
  }
  @Selector()
  static InMoves(state: WarehouseStateModel): WarehouseStateModel["in_moves"] {
    return state.in_moves;
  }
  @Selector()
  static OutMoves(state: WarehouseStateModel): WarehouseStateModel["out_moves"] {
    return state.out_moves;
  }
  @Selector()
  static ProdLog(state: WarehouseStateModel): WarehouseStateModel["production_log"] {
    return state.production_log;
  }
  @Selector()
  static ProdInput(state: WarehouseStateModel): WarehouseStateModel["production_input"] {
    return state.production_input;
  }
  @Selector()
  static Proveedores(state: WarehouseStateModel): WarehouseStateModel["proveedores"] {
    return state.proveedores;
  }
  @Selector()
  static Escandallos(state: WarehouseStateModel): WarehouseStateModel["escandallos"] {
    return state.escandallos;
  }
  @Selector()
  static Colores(state: WarehouseStateModel): WarehouseStateModel["colores"] {
    return state.colores;
  }
  
  @Action(WarehouseActions.SetUsers)
  SetUsers({ patchState }: StateContext<WarehouseStateModel>, { users }: WarehouseActions.SetUsers) {
    patchState({ users })
  }
  @Action(WarehouseActions.fetchUsers)
  fetchUsers({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchUsers) {

    this.warehouse.getStrapi('users').pipe(
      tap(
        ( data : any) => {

          // console.log('users data: ', data);
          
          dispatch(new WarehouseActions.SetUsers({ users: data }))
        }
      )
    ).subscribe()

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

    this.warehouse.getStrapi('warehouse-categories').pipe(
      tap(
        ({ data }: any) => {

          // console.log('categories data: ', data);
          
          dispatch(new WarehouseActions.SetCategories({ categories: data }))
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

    this.warehouse.getStrapi('warehouses').pipe(
      tap(
        ({ data }: any) => {

          // console.log('warehouses data: ', data);
          
          dispatch(new WarehouseActions.SetWarehouses({ warehouses: data }))
        }
      )
    ).subscribe()
  }
  @Action(WarehouseActions.SetVariants)
  SetVariants({ patchState }: StateContext<WarehouseStateModel>, { variants }: WarehouseActions.SetVariants) {
    patchState({ variants })
  }
  @Action(WarehouseActions.fetchVariants)
  fetchVariants({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchVariants) {

    this.warehouse.getStrapi('variants').pipe(
      tap(
        ({ data }: any) => {

          // console.log('variants data: ', data);
          
          dispatch(new WarehouseActions.SetVariants({ variants: data }))
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

    this.warehouse.getStrapi('measurement-units').pipe(
      tap(
        ({ data }: any) => {

          // console.log('measure_units data: ', data);
          
          dispatch(new WarehouseActions.SetMeasurementUnits({ measure_units: data }))
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
    this.warehouse.getStrapi('product-lists').pipe(
      tap(
        ({ data }: any) => {

          // console.log('product list data: ', data);
          
          dispatch(new WarehouseActions.SetProductList({ product_list: data }))
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
    this.warehouse.getStrapi('product-inputs','*&filters[available][$gt]=0').pipe(
      tap(
        ({ data }: any) => {

          // console.log('in_moves data: ', data);
          
          dispatch(new WarehouseActions.SetInMoves({ in_moves: data }))
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

    this.warehouse.getStrapi('product-outputs').pipe(
      tap(
        ({ data }: any) => {

          // console.log('out_moves data: ', data);
          
          dispatch(new WarehouseActions.SetOutMoves({ out_moves: data }))
        }
      )
    ).subscribe()
  }
  @Action(WarehouseActions.SetProductionLog)
  SetProductionLog({ patchState }: StateContext<WarehouseStateModel>, { production_log }: WarehouseActions.SetProductionLog) {
    patchState({ production_log })
  }
  @Action(WarehouseActions.fetchProductionLog)
  fetchProductionLog({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchProductionLog) {

    const range = "'Bitacora de producción'!B1:R";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'prod_log',
            index: 'id',
          }
          // console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const log = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          // console.log('newWarehouseData: ', newWarehouseData);
          
          dispatch(new WarehouseActions.SetProductionLog({ headers, log }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetProductionInput)
  SetProductionInput({ patchState }: StateContext<WarehouseStateModel>, { production_input }: WarehouseActions.SetProductionInput) {
    patchState({ production_input })
  }
  @Action(WarehouseActions.fetchProductionInput)
  fetchProductionInput({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchProductionInput) {

    const range = "'lista de insumos en produccion'!B1:F";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'prod_input',
            index: 'id',
          }
          // console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const inputs = values.filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          
          dispatch(new WarehouseActions.SetProductionInput({ headers, inputs, newId: Number(inputs[0].id) + 1 }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetProveedores)
  SetProveedores({ patchState }: StateContext<WarehouseStateModel>, { proveedores }: WarehouseActions.SetProveedores) {
    patchState({ proveedores })
  }
  @Action(WarehouseActions.fetchProveedores)
  fetchProveedores({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchProveedores) {

    this.warehouse.getStrapi('providers').pipe(
      tap(
        ({ data }: any) => {

          // console.log('proveedores data: ', data);
          
          dispatch(new WarehouseActions.SetProveedores({ proveedores: data }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetEscandallos)
  SetEscandallos({ patchState }: StateContext<WarehouseStateModel>, { escandallos }: WarehouseActions.SetEscandallos) {
    patchState({ escandallos })
  }
  @Action(WarehouseActions.fetchEscandallos)
  fetchEscandallos({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchEscandallos) {

    const range = "'codigos de producto y variante'!B2:F";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'escandallos',
            index: 'producto',
          }
          // console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const escandallos = values
          // .filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          
          dispatch(new WarehouseActions.SetEscandallos({ headers, escandallos }))
        }
      )
    ).subscribe()

  }
  @Action(WarehouseActions.SetColores)
  SetColores({ patchState }: StateContext<WarehouseStateModel>, { colores }: WarehouseActions.SetColores) {
    patchState({ colores })
  }
  @Action(WarehouseActions.fetchColores)
  fetchColores({ dispatch }: StateContext<WarehouseStateModel>, { }: WarehouseActions.fetchColores) {

    const range = "'codigos de producto y variante'!H2:I";
    this.warehouse.getForm(range).pipe(
      tap(
        (data: any) => {
          const config = {
            actions: [],
            chars:  [],
            url: 'colores',
            index: 'color',
          }
          // console.log('data: ', data);
          const { headers, values } = this.parser.parseData( data.values, config)
          const colores = values
          // .filter((product: any) => product.id).sort((a, b) => b.id - a.id )
          
          dispatch(new WarehouseActions.SetColores({ headers, colores }))
        }
      )
    ).subscribe()

  }

}
