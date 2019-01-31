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
import { CoreAccountComponent } from '../../../../Core/Account/account.component';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';
var AccountComponent = /** @class */ (function (_super) {
    __extends(AccountComponent, _super);
    function AccountComponent(service, accGlobals) {
        return _super.call(this, service, accGlobals) || this;
    }
    AccountComponent = __decorate([
        Component({
            selector: 'account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.css'],
            providers: [AccountService]
        }),
        __metadata("design:paramtypes", [AccountService, AccountGlobals])
    ], AccountComponent);
    return AccountComponent;
}(CoreAccountComponent));
export { AccountComponent };
//# sourceMappingURL=account.component.js.map