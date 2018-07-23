import { Injectable } from '@angular/core';

@Injectable()
export class AccountGlobals {
    isLogged: boolean;
    login: string;
    role: string;
}