var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreLocalizerService } from '../../Localization/coreLocalizer.service';
var YesNoComponent = /** @class */ (function () {
    function YesNoComponent(localizer, dialogRef, data) {
        this._localizer = localizer;
        this._dialogRef = dialogRef;
        this.text = data;
    }
    YesNoComponent.prototype.noClick = function () {
        this._dialogRef.close(false);
    };
    YesNoComponent.prototype.yesClick = function () {
        this._dialogRef.close(true);
    };
    YesNoComponent = __decorate([
        Component({
            selector: 'yesNo',
            templateUrl: './yesNo.component.html',
            styleUrls: ['./yesNo.component.css'],
            providers: [CoreLocalizerService]
        }),
        __param(2, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [CoreLocalizerService, MatDialogRef, String])
    ], YesNoComponent);
    return YesNoComponent;
}());
export { YesNoComponent };
//# sourceMappingURL=yesNo.component.js.map