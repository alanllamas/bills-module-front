export class SetBalance {
    static readonly type = '[BalanceState] Set Balance';
    constructor(public balance: any, public headers: any) { }
}
export class fetchBalance {
    static readonly type = '[BalanceState] Fetch Balance';
    constructor() { }
}
export class SetMonth {
    static readonly type = '[BalanceState] Set Month';
    constructor(public month: any) { }
}
export class fetchMonth {
    static readonly type = '[BalanceState] Fetch Month';
    constructor(public month: any) { }
}

