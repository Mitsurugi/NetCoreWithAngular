import { Component, OnInit } from '@angular/core';
import { CoreAccountService } from './account.service';
import { AccountGlobals } from './AccountGlobals';

@Component({
})
export class CoreAccountComponent<TLoginModel> implements OnInit {

    _service: CoreAccountService<TLoginModel>;
    _accGlobals: AccountGlobals;
    _loginModel: TLoginModel;
    _error: string = null;    
    typeLogin: (new () => TLoginModel);

    constructor(service: CoreAccountService<TLoginModel>, accGlobals: AccountGlobals, typeLogin: (new () => TLoginModel))
    {
        this._service = service;
        this._accGlobals = accGlobals;
        this._loginModel = new typeLogin();
        this.typeLogin = typeLogin;
    }

    ngOnInit() {
        this._accGlobals.isLogged = this._service.isTokenPresent();
        this._accGlobals.login = this._service.getUserName();
        this._accGlobals.role = this._service.getRole();
    }

    async getToken() {
        this._error = null;
        try {
            await this._service.getToken(this._loginModel);
        }
        catch (e) {
            this._error = "Invalid login or password";
        }
    }

    deleteToken() {
        try {
            this._service.deleteToken();
        }
        catch (e) {
            this._error = JSON.stringify(e);
        }
    }
}