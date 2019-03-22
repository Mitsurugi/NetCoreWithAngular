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
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(router) {
        this.router = router;
    }
    TokenInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var token = localStorage.getItem("token");
        var cloned = req.clone({ headers: req.headers.delete("Accept-Language").append("Accept-Language", "ru-RU").append("Authorization", "Bearer " + token) });
        return next.handle(cloned).pipe(map(function (response) { return response; }), catchError(function (e, c) { if (e.status === 401 || e.status === 403) {
            localStorage.removeItem("token");
            _this.router.navigate(['/admin/account']);
        } throw e; }));
    };
    TokenInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
export { TokenInterceptor };
//# sourceMappingURL=token.interceptor.js.map