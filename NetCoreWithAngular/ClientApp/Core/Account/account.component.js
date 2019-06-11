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
import { CoreAccountService } from './account.service';
import { AccountGlobals } from './AccountGlobals';
import { LoginModel } from './loginModel';
import { ChangePasswordModel } from './changePasswordModel';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
var CoreAccountComponent = /** @class */ (function () {
    function CoreAccountComponent(service, localizer, accGlobals, router, snackBar) {
        this._redirectUrl = "/admin";
        this._localizer = localizer;
        this._service = service;
        this._accGlobals = accGlobals;
        this._router = router;
        this._snackBar = snackBar;
        this._loginModel = new LoginModel();
        this._changePasswordModel = new ChangePasswordModel();
    }
    CoreAccountComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._accGlobals.refresh();
                return [2 /*return*/];
            });
        });
    };
    CoreAccountComponent.prototype.getTokenAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_1, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.getTokenAsync(this._loginModel)];
                    case 1:
                        _a.sent();
                        popup.dismiss();
                        this._router.navigate([this._redirectUrl]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_1.error));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoreAccountComponent.prototype.deleteToken = function () {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._service.deleteToken();
            popup.dismiss();
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    };
    CoreAccountComponent.prototype.changePasswordAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_2, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.changePasswordAsync(this._changePasswordModel)];
                    case 1:
                        _a.sent();
                        popup = this._snackBar.open(this._localizer.localize(this._localizer.localize("PassChangeSuccess")));
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_2.error));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoreAccountComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [CoreAccountService, CoreLocalizerService, AccountGlobals, Router, MatSnackBar])
    ], CoreAccountComponent);
    return CoreAccountComponent;
}());
export { CoreAccountComponent };
//# sourceMappingURL=account.component.js.map