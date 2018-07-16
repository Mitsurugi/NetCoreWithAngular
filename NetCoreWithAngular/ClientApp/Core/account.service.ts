import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class TokenResponse {
    token: string;
    login: string;
    role: string;
}

@Injectable()
export class CoreAccountService<TLoginModel> {

    _loginPath = "/api/identity/gettoken";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    async getToken(model: TLoginModel) {
        let data = await this._http.post<TokenResponse>(this._loginPath, model).toPromise();
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', data.login);
        localStorage.setItem('role', data.role);
    }

    deleteToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        localStorage.removeItem("role");
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