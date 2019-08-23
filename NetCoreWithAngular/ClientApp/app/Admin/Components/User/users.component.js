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
import { UsersService } from '../../../Core/Users/users.service';
import { UsersBaseComponent } from '../../../Core/Users/usersBase.component';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
var UsersComponent = /** @class */ (function (_super) {
    __extends(UsersComponent, _super);
    function UsersComponent(service, localizer, snackBar, dualog) {
        return _super.call(this, service, localizer, snackBar, dualog) || this;
    }
    UsersComponent = __decorate([
        Component({
            selector: 'users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css'],
            providers: [UsersService]
        }),
        __metadata("design:paramtypes", [UsersService, LocalizerService, MatSnackBar, MatDialog])
    ], UsersComponent);
    return UsersComponent;
}(UsersBaseComponent));
export { UsersComponent };
//# sourceMappingURL=users.component.js.map