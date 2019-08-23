import { Injectable } from '@angular/core';

@Injectable()
export class AccountGlobals {
    isLogged: boolean;
    login: string;
    role: string;

    refresh() {
        if (localStorage.getItem("token"))
            this.isLogged = true;
        else this.isLogged = false;
        this.login = localStorage.getItem("login");
        this.role = localStorage.getItem("role");
    }
}