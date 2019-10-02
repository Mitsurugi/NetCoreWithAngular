import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountGlobals } from './AccountGlobals';
import { LoginModel } from './loginModel';
import { ChangePasswordModel } from './changePasswordModel';
import { map } from 'rxjs/operators';

class TokenResponse {
    token: string;
    login: string;
    role: string;
}

@Injectable()
export class CoreAccountService {

    protected _controllerName = "identity";
    protected _http: HttpClient;
    protected _accGlobals: AccountGlobals;    

    constructor(http: HttpClient, accGlobals: AccountGlobals) {
        this._http = http;
        this._accGlobals = accGlobals;
    }

    getToken(model: LoginModel): Observable<object> {
        return this._http.post<TokenResponse>('/api/' + this._controllerName + '/tokenRequest', model).pipe(
            map((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('login', data.login);
                localStorage.setItem('role', data.role);
                this._accGlobals.refresh();
                return data;
            }));
    }

    deleteToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        localStorage.removeItem("role");
        this._accGlobals.refresh();
    }

    changePassword(model: ChangePasswordModel): Observable<object> {
        return this._http.post('/api/' + this._controllerName + '/ChangePassword', model);
    }
}