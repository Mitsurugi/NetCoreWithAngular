import { Component, OnInit } from '@angular/core';
import { CoreAccountService } from './account.service';
import { AccountGlobals } from './AccountGlobals';
import { LoginModel } from './loginModel';
import { ChangePasswordModel } from './changePasswordModel';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
})
export class CoreAccountComponent implements OnInit {

    _service: CoreAccountService;
    _accGlobals: AccountGlobals;
    _loginModel: LoginModel;
    _changePasswordModel: ChangePasswordModel;
    _localizer: CoreLocalizerService;
    _router: Router;
    _snackBar: MatSnackBar;
    _redirectUrl = "/admin";

    constructor(service: CoreAccountService, localizer: CoreLocalizerService, accGlobals: AccountGlobals, router: Router, snackBar: MatSnackBar)
    {
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._router = router;
        this._snackBar = snackBar;
        this._loginModel = new LoginModel();
        this._changePasswordModel = new ChangePasswordModel();
    }

    public async ngOnInit() {
        this._accGlobals.refresh();        
    }

    public async getTokenAsync() {        
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this._service.getTokenAsync(this._loginModel);
            popup.dismiss();
            this._router.navigate([this._redirectUrl]);
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }

    public deleteToken() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._service.deleteToken();
            popup.dismiss();
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }

    public async changePasswordAsync() {        
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this._service.changePasswordAsync(this._changePasswordModel);
            popup = this._snackBar.open(this._localizer.localize(this._localizer.localize("PassChangeSuccess")));
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }
}