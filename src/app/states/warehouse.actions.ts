export class SetInventory {
    static readonly type = '[WarehouseState] Set Inventory';
    constructor(public inventory: any) { }
}
export class fetchInventory {
    static readonly type = '[WarehouseState] Fetch Inventory';
    constructor() { }
}
export class SetUsers {
    static readonly type = '[WarehouseState] Set Users';
    constructor(public users: any) { }
}
export class fetchUsers {
    static readonly type = '[WarehouseState] Fetch Users';
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
export class SetVariants {
    static readonly type = '[WarehouseState] Set Variants';
    constructor(public variants: any) { }
}
export class fetchVariants {
    static readonly type = '[WarehouseState] Fetch Variants';
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
export class SetProductionLog {
    static readonly type = '[WarehouseState] Set Production Log';
    constructor(public production_log: any) { }
}
export class fetchProductionLog {
    static readonly type = '[WarehouseState] Fetch Production Log';
    constructor() { }
}
export class SetProductionInput {
    static readonly type = '[WarehouseState] Set Production Input';
    constructor(public production_input: any) { }
}
export class fetchProductionInput {
    static readonly type = '[WarehouseState] Fetch Production Input';
    constructor() { }
}
export class SetProveedores {
    static readonly type = '[WarehouseState] Set Proveedores';
    constructor(public proveedores: any) { }
}
export class fetchProveedores {
    static readonly type = '[WarehouseState] Fetch Proveedores';
    constructor() { }
}
export class SetEscandallos {
    static readonly type = '[WarehouseState] Set Escandallos';
    constructor(public escandallos: any) { }
}
export class fetchEscandallos {
    static readonly type = '[WarehouseState] Fetch Escandallos';
    constructor() { }
}
export class SetColores {
    static readonly type = '[WarehouseState] Set Colores';
    constructor(public colores: any) { }
}
export class fetchColores {
    static readonly type = '[WarehouseState] Fetch Colores';
    constructor() { }
}
export class SetBatchCode {
    static readonly type = '[WarehouseState] Set Batch Code';
    constructor(public product, public variant, public provider, public date) { }
}

