import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountGlobals } from './AccountGlobals';

class TokenResponse {
    token: string;
    login: string;
    role: string;
}

@Injectable()
export class CoreAccountService<TLoginModel> {

    _accGlobals: AccountGlobals;
    _loginPath = "/api/identity/gettoken";
    _http: HttpClient;

    constructor(http: HttpClient, accGlobals: AccountGlobals) {
        this._http = http;
        this._accGlobals = accGlobals;
    }

    async getToken(model: TLoginModel) {
        let data = await this._http.post<TokenResponse>(this._loginPath, model).toPromise();
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', data.login);
        localStorage.setItem('role', data.role);
        this._accGlobals.isLogged = true;
        this._accGlobals.login = data.login;
        this._accGlobals.role = data.role;
    }

    deleteToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        localStorage.removeItem("role");
        this._accGlobals.isLogged = false;
        this._accGlobals.login = "";
        this._accGlobals.role = "";
    }

    isTokenPresent(): boolean {
        if (localStorage.getItem("token"))
            return true;
        else return false;
    }

    getUserName(): string {
        return localStorage.getItem("login");
    }
    getRole(): string {
        return localStorage.getItem("role");
    }
}