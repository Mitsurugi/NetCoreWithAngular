var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { LoginModel } from '../../../Core/Account/loginModel';
import { ChangePasswordModel } from '../../../Core/Account/changePasswordModel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
var AccountComponent = /** @class */ (function () {
    function AccountComponent(service, localizer, accGlobals, router, snackBar) {
        this._redirectUrl = "/admin";
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._router = router;
        this._snackBar = snackBar;
        this.loginModel = new LoginModel();
        this.changePasswordModel = new ChangePasswordModel();
    }
    AccountComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._accGlobals.refresh();
                if (!this._accGlobals.isLogged) {
                    this._router.navigate([this._redirectUrl]);
                }
                return [2 /*return*/];
            });
        });
    };
    AccountComponent.prototype.deleteToken = function () {
        this._service.deleteToken();
        this._router.navigate([this._redirectUrl]);
    };
    AccountComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.changePasswordModel.newPassword != this.changePasswordModel.newPassword2) {
            var popup = this._snackBar.open(this._localizer.localize("PassNotMatch"));
            return;
        }
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.changePassword(this.changePasswordModel).subscribe(function (data) { popup = _this._snackBar.open(_this._localizer.localize("PassChangeSuccess"), null, { duration: 5000 }); }, function (e) {
            if (popup)
                popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    AccountComponent = __decorate([
        Component({
            selector: 'account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.css'],
            providers: [AccountService]
        }),
        __metadata("design:paramtypes", [AccountService, LocalizerService, AccountGlobals, Router, MatSnackBar])
    ], AccountComponent);
    return AccountComponent;
}());
export { AccountComponent };
//# sourceMappingURL=account.component.js.map