var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { CoreComponent } from '../../Core/core.component';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/Book';
var BookComponent = /** @class */ (function (_super) {
    __extends(BookComponent, _super);
    function BookComponent(service) {
        var _this = _super.call(this, service, Book, Book, Book) || this;
        _this.pageSize = 10;
        return _this;
    }
    BookComponent.prototype.postCreate = function () {
        this.itemCreate.title = '*' + this.itemCreate.title + '*';
        _super.prototype.postCreate.call(this);
    };
    BookComponent = __decorate([
        Component({
            selector: 'book',
            templateUrl: './book.component.html',
            styleUrls: ['./book.component.css'],
            providers: [BookService]
        }),
        __metadata("design:paramtypes", [BookService])
    ], BookComponent);
    return BookComponent;
}(CoreComponent));
export { BookComponent };
//# sourceMappingURL=book.component.js.map