var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { LoginModel } from '../../../Core/Account/loginModel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(service, localizer, accGlobals, router, snackBar) {
        this._destroyed = new Subject();
        this._redirectUrl = "/admin";
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._router = router;
        this._snackBar = snackBar;
        this.loginModel = new LoginModel();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._accGlobals.refresh();
        if (this._accGlobals.isLogged) {
            this._router.navigate([this._redirectUrl]);
        }
    };
    LoginComponent.prototype.getToken = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getToken(this.loginModel).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            if (popup) {
                popup.dismiss();
            }
            _this._router.navigate([_this._redirectUrl]);
        }, function (e) {
            if (popup) {
                popup.dismiss();
            }
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [AccountService]
        }),
        __metadata("design:paramtypes", [AccountService, LocalizerService, AccountGlobals, Router, MatSnackBar])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map