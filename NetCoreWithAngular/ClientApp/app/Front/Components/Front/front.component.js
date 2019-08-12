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
import { FrontDataService } from '../../Services/frontData.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
var FrontComponent = /** @class */ (function () {
    function FrontComponent(service) {
        this._destroyed = new Subject();
        this._service = service;
        this.anime = new Array();
        this.books = new Array();
    }
    FrontComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getAllAnime().pipe(takeUntil(this._destroyed)).subscribe(function (data) { return _this.anime = data; });
        this._service.getAllBooks().pipe(takeUntil(this._destroyed)).subscribe(function (data) { return _this.books = data; });
    };
    FrontComponent = __decorate([
        Component({
            selector: 'front',
            templateUrl: './front.component.html',
            styleUrls: ['./front.component.css'],
            providers: [FrontDataService]
        }),
        __metadata("design:paramtypes", [FrontDataService])
    ], FrontComponent);
    return FrontComponent;
}());
export { FrontComponent };
//# sourceMappingURL=front.component.js.map