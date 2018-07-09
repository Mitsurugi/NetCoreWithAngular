var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var TokenResponse = /** @class */ (function () {
    function TokenResponse() {
    }
    return TokenResponse;
}());
var CoreAccountService = /** @class */ (function () {
    function CoreAccountService(http) {
        this._loginPath = "/api/identity/gettoken";
        this._http = http;
    }
    CoreAccountService.prototype.getToken = function (model) {
        return this._http.post(this._loginPath, model).pipe(map(function (data) { localStorage.setItem('token', data.token); localStorage.setItem('login', data.login); return data; }));
    };
    CoreAccountService.prototype.deleteToken = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
    };
    CoreAccountService.prototype.isTokenPresent = function () {
        if (localStorage.getItem("token"))
            return true;
        else
            return false;
    };
    CoreAccountService.prototype.getUserName = function () {
        return localStorage.getItem("login");
    };
    CoreAccountService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], CoreAccountService);
    return CoreAccountService;
}());
export { CoreAccountService };
//# sourceMappingURL=account.service.js.map