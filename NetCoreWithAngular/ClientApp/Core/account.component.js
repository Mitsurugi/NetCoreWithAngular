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
import { CoreAccountService } from './account.service';
var CoreAccountComponent = /** @class */ (function () {
    function CoreAccountComponent(service, typeLogin) {
        this.error = null;
        this._service = service;
        this.loginData = new typeLogin();
    }
    CoreAccountComponent.prototype.getToken = function () {
        var _this = this;
        this.error = null;
        this._service.getToken(this.loginData).subscribe(null, function (e) { _this.error = "Invalid login or password"; });
    };
    CoreAccountComponent.prototype.deleteToken = function () {
        this._service.deleteToken();
    };
    CoreAccountComponent.prototype.isTokenPresent = function () {
        return this._service.isTokenPresent();
    };
    CoreAccountComponent.prototype.getUserName = function () {
        return this._service.getUserName();
    };
    CoreAccountComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [CoreAccountService, Function])
    ], CoreAccountComponent);
    return CoreAccountComponent;
}());
export { CoreAccountComponent };
//# sourceMappingURL=account.component.js.map