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
import { EditComponent } from '../../../../Core/Components/edit.component';
import { BookService } from '../../Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
var BookEditComponent = /** @class */ (function (_super) {
    __extends(BookEditComponent, _super);
    function BookEditComponent(service, localizer, route, router, snackBar) {
        return _super.call(this, service, localizer, snackBar, route, router, 'admin/book') || this;
    }
    BookEditComponent = __decorate([
        Component({
            selector: 'book-edit',
            templateUrl: './bookEdit.component.html',
            styleUrls: ['./bookEdit.component.css'],
            providers: [BookService]
        }),
        __metadata("design:paramtypes", [BookService, LocalizerService, ActivatedRoute, Router, MatSnackBar])
    ], BookEditComponent);
    return BookEditComponent;
}(EditComponent));
export { BookEditComponent };
//# sourceMappingURL=bookEdit.component.js.map