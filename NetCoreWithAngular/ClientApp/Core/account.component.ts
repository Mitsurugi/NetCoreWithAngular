import { Component, OnInit } from '@angular/core';
import { CoreAccountService } from './account.service';

@Component({
})
export class CoreAccountComponent<TLoginModel> implements OnInit {

    _service: CoreAccountService<TLoginModel>;

    loginData: TLoginModel;
    error: string = null;
    userName: string;
    role: string;
    isLogged: boolean = false;

    typeLogin: (new () => TLoginModel);

    constructor(service: CoreAccountService<TLoginModel>, typeLogin: (new () => TLoginModel))
    {
        this._service = service;
        this.loginData = new typeLogin();
        this.typeLogin = typeLogin;
    }

    ngOnInit() {
        this.isLogged = this._service.isTokenPresent();
        this.userName = this._service.getUserName();
        this.role = this._service.getRole();
    }

    async getToken() {
        this.error = null;
        try {
            await this._service.getToken(this.loginData);
            this.userName = this._service.getUserName();
            this.role = this._service.getRole();
            this.isLogged = true;
        }
        catch (e) {
            this.error = "Invalid login or password";
        }
    }

    deleteToken() {
        try {
            this._service.deleteToken();
            this.isLogged = false;
        }
        catch (e) {
            this.error = JSON.stringify(e);
        }
    }
}