import { Component, OnInit } from '@angular/core';
import { CoreAccountService } from './account.service';
import { AccountGlobals } from './AccountGlobals';
import { LoginModel } from './loginModel';
import { ChangePasswordModel } from './changePasswordModel';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';

@Component({
})
export class CoreAccountComponent implements OnInit {

    _service: CoreAccountService;
    _accGlobals: AccountGlobals;
    _loginModel: LoginModel;
    _changePasswordModel: ChangePasswordModel;
    _localizer: CoreLocalizerService;
    _message: string = null;

    constructor(service: CoreAccountService, localizer: CoreLocalizerService, accGlobals: AccountGlobals)
    {
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._loginModel = new LoginModel();
        this._changePasswordModel = new ChangePasswordModel();
    }

    public async ngOnInit() {
        this._accGlobals.refresh();        
    }

    public async getTokenAsync() {        
        try {
            this._message = this._localizer.localize("Loading");
            await this._service.getTokenAsync(this._loginModel);
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public deleteToken() {
        try {
            this._message = this._localizer.localize("Loading");
            this._service.deleteToken();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async changePasswordAsync() {        
        try {
            this._message = this._localizer.localize("Loading");
            await this._service.changePasswordAsync(this._changePasswordModel);
            this._message = this._localizer.localize("PassChangeSuccess");
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }
}