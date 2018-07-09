import { Component, OnInit } from '@angular/core';
import { CoreAccountService } from './account.service';
import { retry } from 'rxjs/operators';

@Component({
})
export class CoreAccountComponent<TLoginModel> {

    _service: CoreAccountService<TLoginModel>;

    loginData: TLoginModel;
    error: string = null;

    constructor(service: CoreAccountService<TLoginModel>, typeLogin: (new () => TLoginModel))
    {
        this._service = service;
        this.loginData = new typeLogin();
    }

    getToken() {
        this.error = null;
        this._service.getToken(this.loginData).subscribe(null, (e) => { this.error = "Invalid login or password"; })
    }

    deleteToken() {
        this._service.deleteToken();
    }

    isTokenPresent(): boolean {
        return this._service.isTokenPresent();
    }

    getUserName(): string {
        return this._service.getUserName();
    }
}