﻿import { Component, OnInit } from '@angular/core';
import { CoreAccountService } from './account.service';
import { AccountGlobals } from './AccountGlobals';
import { LoginModel } from './loginModel';
import { ChangePasswordModel } from './changePasswordModel';

@Component({
})
export class CoreAccountComponent implements OnInit {

    _service: CoreAccountService;
    _accGlobals: AccountGlobals;
    _loginModel: LoginModel;
    _changePasswordModel: ChangePasswordModel;
    _error: string = null;

    constructor(service: CoreAccountService, accGlobals: AccountGlobals)
    {
        this._service = service;
        this._accGlobals = accGlobals;
        this._loginModel = new LoginModel();
        this._changePasswordModel = new ChangePasswordModel();
    }

    ngOnInit() {
        this._accGlobals.refresh();        
    }

    async getToken() {
        this._error = null;
        try {
            await this._service.getToken(this._loginModel);
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    deleteToken() {
        try {
            this._service.deleteToken();
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    changePassword() {
        try {
            this._service.changePassword(this._changePasswordModel);
            this._error = "Password successfully changed."
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }
}