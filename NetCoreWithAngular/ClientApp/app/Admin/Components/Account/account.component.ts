import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { LoginModel } from '../../../../Core/Account/loginModel';
import { ChangePasswordModel } from '../../../../Core/Account/changePasswordModel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [AccountService]
})
export class AccountComponent implements OnInit {

    _service: AccountService;
    _accGlobals: AccountGlobals;
    _loginModel: LoginModel;
    _changePasswordModel: ChangePasswordModel;
    _localizer: LocalizerService;
    _router: Router;
    _snackBar: MatSnackBar;
    _redirectUrl = "/admin";

    constructor(service: AccountService, localizer: LocalizerService, accGlobals: AccountGlobals, router: Router, snackBar: MatSnackBar) {
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
        if (!this._accGlobals.isLogged) {
            this._router.navigate([this._redirectUrl]);
        }
    }

    public deleteToken() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._service.deleteToken();
            popup.dismiss();
            this._router.navigate([this._redirectUrl]);
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async changePasswordAsync(valid: boolean) {
        if (valid) {
            try {
                if (this._changePasswordModel.newPassword != this._changePasswordModel.newPassword2) {
                    var popup = this._snackBar.open(this._localizer.localize("PassNotMatch"));
                    return;
                }
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this._service.changePasswordAsync(this._changePasswordModel);
                popup = this._snackBar.open(this._localizer.localize("PassChangeSuccess"), null, { duration: 5000 });
            }
            catch (e) {
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        }        
    }
}