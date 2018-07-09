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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/core.service';
import { map } from 'rxjs/operators';
import { Book } from '../Models/Book';
var BookService = /** @class */ (function (_super) {
    __extends(BookService, _super);
    function BookService(http) {
        var _this = _super.call(this, http) || this;
        _this._controller = 'book';
        return _this;
    }
    BookService.prototype.postCreate = function (item) {
        item.title = '!' + item.title + '!';
        return _super.prototype.postCreate.call(this, item);
    };
    BookService.prototype.getGrid = function (pageNumber, pageSize) {
        return _super.prototype.getGrid.call(this, pageNumber, pageSize).pipe(map(function (response) {
            var b = new Book();
            b.id = 999;
            b.title = "fromService";
            b.author = "fromService";
            b.pageCount = 999;
            response.push(b);
            return response;
        }));
    };
    BookService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], BookService);
    return BookService;
}(CoreService));
export { BookService };
//# sourceMappingURL=book.service.js.map