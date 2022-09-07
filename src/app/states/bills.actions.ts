export class SetBills {
    static readonly type = '[BillsState] Set Bills';
    constructor(public bills: any, public headers: any) { }
}
export class fetchBills {
    static readonly type = '[BillsState] Fetch Bills';
    constructor() { }
}
export class SetBill {
    static readonly type = '[BillsState] Set Bill';
    constructor(public id: any) { }
}

