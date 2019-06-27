import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { LoginModel } from '../../../../Core/Account/loginModel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AccountService]
})
export class LoginComponent implements OnInit {

    _service: AccountService;
    _accGlobals: AccountGlobals;
    _loginModel: LoginModel;
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
    }

    public async ngOnInit() {
        this._accGlobals.refresh();
        if (this._accGlobals.isLogged) {
            this._router.navigate([this._redirectUrl]);
        }
    }

    public async getTokenAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this._service.getTokenAsync(this._loginModel);
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
}