﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreAccountService } from '../../../Core/account.service';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/login';
import { AccountGlobals } from '../../../Core/AccountGlobals';

@Injectable()
export class AccountService extends CoreAccountService<LoginModel> {

    constructor(http: HttpClient, accGlobals: AccountGlobals) { super(http, accGlobals); this._loginPath = '/api/identity/gettoken'; }
}