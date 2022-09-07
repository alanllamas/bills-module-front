import { State, Action, StateContext, Selector } from '@ngxs/store';

import * as BalanceActions from './balance.actions';
import { Injectable } from '@angular/core';
import { BalanceService } from '../balance/balance.service';
import { SheetParserService } from '../utils/sheet-parser.service';
import { forkJoin, of, tap } from 'rxjs';


export class BalanceStateModel {
  headers: any[]
  balance: any[]
  month: {
    balance: any;
    totals: any;
    income: any;
    outcome: any;
    edit_balance: any;
    edit_balance_url: any;
    headers: any;
    monthLabel: string;
  } 
}

@State<BalanceStateModel>({
  name: 'balance',
  defaults: {
    headers: [],
    balance: [],
    month: null
  }
})


@Injectable()
export class BalanceState {

  config = {
    actions: [{action:'form_response_edit_url', key: 'edit'}],
    chars:  [{ find: '/', replace: '-'}],
    url: 'balance',
    index: 'fecha'
  }
  configConfig = {
    actions: [{action:'form_response_edit_url', key: 'edit'}],
    chars:  [{ find: '/', replace: '-'}],
    url: 'balance',
    index: 'fecha'
  }
  configIncome = {
    actions: [],
    chars:  [{ find: '# ', replace: ''}],
    url: 'bills',
    index: 'nota'
  }
  configOutcome = {
    actions: [],
    chars:  [{ find: '# ', replace: ''}],
    url: 'spents',
    index: '',
    use_index : true
  }
  configEdit = {
    actions: [],
    chars:  [{ find: '# ', replace: ''}],
    url: 'balance',
    index: 'form_response_edit_url',
    use_index : true
  }

  constructor(public balanceService: BalanceService, public parser: SheetParserService) { }


  @Selector()
  static headers(state: BalanceStateModel): BalanceStateModel["headers"] {
    return state.headers;
  }
  @Selector()
  static balance(state: BalanceStateModel): BalanceStateModel["balance"] {
    return state.balance;
  }
  @Selector()
  static month(state: BalanceStateModel): BalanceStateModel["month"] {
    return state.month;
  }

  
  @Action(BalanceActions.SetBalance)
  setBalance({ patchState }: StateContext<BalanceStateModel>, { balance, headers }: BalanceActions.SetBalance) {
    patchState({ balance, headers })
  }
  @Action(BalanceActions.fetchBalance)
  fetchBalance({ dispatch }: StateContext<BalanceStateModel>, { }: BalanceActions.fetchBalance) {
    this.balanceService.getForm("Historial de caja!B1:O").pipe(
      tap(
        (balanceData: any) => {
          const config = {
            actions: [{action:'form_response_edit_url', key: 'edit'}],
            chars:  [{ find: '/', replace: '-'}],
            url: 'balance',
            index: 'fecha'
          }
          const newBalanceData = this.parser.parseData( balanceData.values, config)
          newBalanceData.values = newBalanceData.values.filter((balance: any) => balance.fecha).sort((a, b) => b.id - a.id )
          dispatch(new BalanceActions.SetBalance(newBalanceData.values, newBalanceData.headers))
        }
      )
    ).subscribe()

  }
  @Action(BalanceActions.SetMonth)
  SetMonth({ patchState }: StateContext<BalanceStateModel>, { month }: BalanceActions.SetMonth) {
    patchState({ month })
  }
  @Action(BalanceActions.fetchMonth)
  fetchMonth({ patchState, getState, dispatch }: StateContext<BalanceStateModel>, { month }: BalanceActions.fetchMonth) {
    const [first, ...rest ] : string = month
    const Month = `${first.toUpperCase()}${rest.join('')}`
    const balanceRangeA = `${Month}!B2:D11`
    // console.log('balanceRange: ', balanceRange);
    const balanceRangeB = `${Month}!E2:G11`
    // console.log('balanceRange: ', balanceRange);
    const incomeRange = `${Month}!A13:E`
    // console.log('incomeRange: ', incomeRange);
    const outcomeRange = `${Month}!F13:J`
    // console.log('outcomeRange: ', outcomeRange);
    const configRange = `${Month}!H1:I11`
    // console.log('configRange: ', configRange);
    const editRange = `${Month}!AC3:AD4`
    // console.log('editRange: ', editRange);
    forkJoin({
      balanceA: this.balanceService.getForm(balanceRangeA),
      balanceB: this.balanceService.getForm(balanceRangeB),
      income: this.balanceService.getForm(incomeRange),
      outcome: this.balanceService.getForm(outcomeRange),
      config: this.balanceService.getForm(configRange),
      edit_balance: this.balanceService.getForm(editRange),
    }).pipe(
      tap((data) => {
        
        const parsedData = this.parser.parseData( data.balanceA['values'], this.config)
        const parsedData2 = this.parser.parseData( data.balanceB['values'], this.config)
        const parsedMonth = [...parsedData2.values, ...parsedData.values].reduce((acc, curr) => {
          if (!curr.cantidad) {
            const { denominacion, total } = curr
            acc.results = [ ...acc.results, { label: denominacion, value: total } ]
          } else {
            const { denominacion, total, cantidad } = curr
            acc.balance = [ ...acc.balance, { label: denominacion, value: total, quantity: cantidad } ]
          }
          return acc
        }, { balance: [], results: [] })
        
        const configData = this.parser.parseData( data.config['values'], this.configConfig)
        const parsedTotals = configData.values.reduce((acc, curr) => {
          if (!curr.fecha_inicial.includes(22)) {
            acc = [...acc, {
              key : curr.fecha_inicial,
              value : curr.fecha_final
            }]
          } else {
            acc = [
              ...acc,
              {
                key : 'Fecha inicial',
                value : curr.fecha_inicial
              },
              {
                key : 'Fecha final',
                value : curr.fecha_final
              },
            ]
          }
          return acc
        }, [])

        let parsedIncome = this.parser.parseData( data.income['values'], this.configIncome)
        parsedIncome = { ...parsedIncome, values: parsedIncome.values.sort((a, b) => b.id - a.id )}

        let parsedOutcome = this.parser.parseData( data.outcome['values'], this.configOutcome)
        parsedOutcome = { ...parsedOutcome, values: parsedOutcome.values.sort((a, b) => b.id - a.id )}

        const parsedEdit_balance = this.parser.parseData( data.edit_balance['values'], this.configEdit)
        const editBalanceData_url = parsedEdit_balance.values[0].form_response_edit_url
        
        
        const parsedHeaders = parsedData.headers
        const monthData = {
          balance: parsedMonth,
          totals: parsedTotals,
          income: parsedIncome,
          outcome: parsedOutcome,
          edit_balance: parsedEdit_balance,
          edit_balance_url: editBalanceData_url,
          headers: parsedHeaders,
          monthLabel: Month
        }
        dispatch(new BalanceActions.SetMonth(monthData))

      })
      ).subscribe()
  }
  
  
}