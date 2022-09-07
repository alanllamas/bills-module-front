export class SetSpents {
    static readonly type = '[SpentsState] Set Spents';
    constructor(public spents: any, public headers: any) { }
}
export class fetchSpents {
    static readonly type = '[SpentsState] Fetch Spents';
    constructor() { }
}
export class SetSpent {
    static readonly type = '[SpentsState] Set Spent';
    constructor(public id: any) { }
}

