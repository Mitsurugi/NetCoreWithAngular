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

    protected _service: AccountService;
    protected _accGlobals: AccountGlobals;    
    protected _localizer: LocalizerService;
    protected _router: Router;
    protected _snackBar: MatSnackBar;
    protected _redirectUrl = "/admin";

    loginModel: LoginModel;
    changePasswordModel: ChangePasswordModel;

    constructor(service: AccountService, localizer: LocalizerService, accGlobals: AccountGlobals, router: Router, snackBar: MatSnackBar) {
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._router = router;
        this._snackBar = snackBar;
        this.loginModel = new LoginModel();
        this.changePasswordModel = new ChangePasswordModel();
    }

    async ngOnInit() {
        this._accGlobals.refresh();
        if (!this._accGlobals.isLogged) {
            this._router.navigate([this._redirectUrl]);
        }
    }

    deleteToken() {
        this._service.deleteToken();
        this._router.navigate([this._redirectUrl]);
    }

    changePassword() {
        if (this.changePasswordModel.newPassword != this.changePasswordModel.newPassword2) {
            var popup = this._snackBar.open(this._localizer.localize("PassNotMatch"));
            return;
        }
        var popup = this._snackBar.open(this._localizer.localize("Loading"));

        this._service.changePassword(this.changePasswordModel).subscribe(
            data => { popup = this._snackBar.open(this._localizer.localize("PassChangeSuccess"), null, { duration: 5000 }); },
            e => {
                if (popup) popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );       
    }
}