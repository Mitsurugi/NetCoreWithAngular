import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { LoginModel } from '../../../../Core/Account/loginModel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AccountService]
})
export class LoginComponent implements OnInit {

    protected _destroyed: Subject<void> = new Subject();
    protected _service: AccountService;
    protected _accGlobals: AccountGlobals;
    protected _localizer: LocalizerService;
    protected _router: Router;
    protected _snackBar: MatSnackBar;
    protected _redirectUrl = "/admin";

    loginModel: LoginModel;

    constructor(service: AccountService, localizer: LocalizerService, accGlobals: AccountGlobals, router: Router, snackBar: MatSnackBar) {
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._router = router;
        this._snackBar = snackBar;
        this.loginModel = new LoginModel();
    }

    ngOnInit() {
        this._accGlobals.refresh();
        if (this._accGlobals.isLogged) {
            this._router.navigate([this._redirectUrl]);
        }
    }

    getToken() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getToken(this.loginModel).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                if (popup) { popup.dismiss(); }
                this._router.navigate([this._redirectUrl]);
            },
            e => {
                if (popup) { popup.dismiss(); }
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }
}