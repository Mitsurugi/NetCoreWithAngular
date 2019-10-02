import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreAccountService } from '../../Core/Account/account.service';
import { Observable } from 'rxjs';
import { AccountGlobals } from '../../Core/Account/AccountGlobals';

@Injectable()
export class AccountService extends CoreAccountService {

    constructor(http: HttpClient, accGlobals: AccountGlobals) { super(http, accGlobals) }
}