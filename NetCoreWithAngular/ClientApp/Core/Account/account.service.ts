import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountGlobals } from './AccountGlobals';
import { LoginModel } from './loginModel';
import { ChangePasswordModel } from './changePasswordModel';

class TokenResponse {
    token: string;
    login: string;
    role: string;
}

@Injectable()
export class CoreAccountService {

    protected _accGlobals: AccountGlobals;
    protected _controllerName = "identity";
    protected _http: HttpClient;

    constructor(http: HttpClient, accGlobals: AccountGlobals) {
        this._http = http;
        this._accGlobals = accGlobals;
    }

    public async getTokenAsync(model: LoginModel) {
        let data = await this._http.post<TokenResponse>('/api/' + this._controllerName + '/tokenRequest', model).toPromise();
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', data.login);
        localStorage.setItem('role', data.role);
        this._accGlobals.refresh();
    }

    public deleteToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        localStorage.removeItem("role");
        this._accGlobals.refresh();        
    }

    public async changePasswordAsync(model: ChangePasswordModel) {
        await this._http.post('/api/' + this._controllerName + '/ChangePassword', model).toPromise();
        this.deleteToken();
    }
}