var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
import { CoreComponent } from '../../../../Core/Components/core.component';
import { BookService } from '../../Services/book.service';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
var BookComponent = /** @class */ (function (_super) {
    __extends(BookComponent, _super);
    function BookComponent(service, localizer, snackBar) {
        var _this = _super.call(this, service, localizer, snackBar) || this;
        _this.pageSize = 3;
        return _this;
    }
    BookComponent.prototype.saveCreateModel = function () {
        this.itemCreate.title = '*' + this.itemCreate.title + '*';
        _super.prototype.saveCreateModel.call(this);
    };
    BookComponent = __decorate([
        Component({
            selector: 'books',
            templateUrl: './book.component.html',
            styleUrls: ['./book.component.css'],
            providers: [BookService]
        }),
        __metadata("design:paramtypes", [BookService, LocalizerService, MatSnackBar])
    ], BookComponent);
    return BookComponent;
}(CoreComponent));
export { BookComponent };
//# sourceMappingURL=book.component.js.map