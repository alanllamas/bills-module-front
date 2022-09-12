export class SetInventory {
    static readonly type = '[WarehouseState] Set Inventory';
    constructor(public inventory: any) { }
}
export class fetchInventory {
    static readonly type = '[WarehouseState] Fetch Inventory';
    constructor() { }
}
export class SetCategories {
    static readonly type = '[WarehouseState] Set Categories';
    constructor(public categories: any) { }
}
export class fetchCategories {
    static readonly type = '[WarehouseState] Fetch Categories';
    constructor() { }
}

