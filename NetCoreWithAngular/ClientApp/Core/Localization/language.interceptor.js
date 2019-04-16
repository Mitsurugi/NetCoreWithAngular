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
import { Router } from '@angular/router';
var LanguageInterceptor = /** @class */ (function () {
    function LanguageInterceptor(router) {
        this.router = router;
    }
    LanguageInterceptor.prototype.intercept = function (req, next) {
        var lang = "ru-RU";
        if (localStorage.getItem("lang")) {
            lang = localStorage.getItem("lang");
        }
        var cloned = req.clone({ headers: req.headers.delete("Accept-Language").append("Accept-Language", lang) });
        return next.handle(cloned);
    };
    LanguageInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], LanguageInterceptor);
    return LanguageInterceptor;
}());
export { LanguageInterceptor };
//# sourceMappingURL=language.interceptor.js.map