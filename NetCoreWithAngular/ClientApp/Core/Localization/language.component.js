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
var CoreLanguageComponent = /** @class */ (function () {
    function CoreLanguageComponent() {
        this._message = null;
        this._lang = "ru-RU";
    }
    CoreLanguageComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem("lang")) {
            this._lang = localStorage.getItem("lang");
        }
    };
    CoreLanguageComponent.prototype.changeLanguage = function () {
        this._message = null;
        try {
            localStorage.setItem('lang', this._lang);
        }
        catch (e) {
            this._message = e.error;
        }
    };
    CoreLanguageComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [])
    ], CoreLanguageComponent);
    return CoreLanguageComponent;
}());
export { CoreLanguageComponent };
//# sourceMappingURL=language.component.js.map