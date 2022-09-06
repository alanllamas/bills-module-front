export class SetToken {
    static readonly type = '[AppState] Set Token';
    constructor(public token?: any, public expirationTime?: Date, public refreshToken?: any ) { }
}

export class Logout {
    static readonly type = '[AppState] Logout';
}

export class SetIsLoggedIn {
    static readonly type = '[AppState] Set Is Logged In';
    constructor(public payload: boolean) { }
}


