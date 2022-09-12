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
export class SetWarehouses {
    static readonly type = '[WarehouseState] Set Warehouses';
    constructor(public warehouses: any) { }
}
export class fetchWarehouses {
    static readonly type = '[WarehouseState] Fetch Warehouses';
    constructor() { }
}
export class SetMeasurementUnits {
    static readonly type = '[WarehouseState] Set Measurement Units';
    constructor(public measure_units: any) { }
}
export class fetchMeasurementUnits {
    static readonly type = '[WarehouseState] Fetch Measurement Units';
    constructor() { }
}
export class SetProductList {
    static readonly type = '[WarehouseState] Set Product List';
    constructor(public product_list: any) { }
}
export class fetchProductList {
    static readonly type = '[WarehouseState] Fetch Product List';
    constructor() { }
}
export class SetInMoves {
    static readonly type = '[WarehouseState] Set In Moves';
    constructor(public in_moves: any) { }
}
export class fetchInMoves {
    static readonly type = '[WarehouseState] Fetch In Moves';
    constructor() { }
}
export class SetOutMoves {
    static readonly type = '[WarehouseState] Set Out Moves';
    constructor(public out_moves: any) { }
}
export class fetchOutMoves {
    static readonly type = '[WarehouseState] Fetch Out Moves';
    constructor() { }
}

