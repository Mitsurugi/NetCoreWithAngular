import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class TokenResponse {
    token: string;
    login: string;
}

@Injectable()
export class CoreAccountService<TLoginModel> {

    _loginPath = "/api/identity/gettoken";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    getToken(model: TLoginModel) {
        return this._http.post<TokenResponse>(this._loginPath, model).pipe(map(data => { localStorage.setItem('token', data.token); localStorage.setItem('login', data.login); return data; }));
    }

    deleteToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
    }

    isTokenPresent(): boolean {
        if (localStorage.getItem("token"))
            return true;
        else return false;
    }

    getUserName(): string {
        return localStorage.getItem("login");
    }
}