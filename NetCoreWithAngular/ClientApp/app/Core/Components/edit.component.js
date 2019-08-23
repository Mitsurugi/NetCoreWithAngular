var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Component } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { ActivatedRoute, Router } from "@angular/router";
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
var EditComponent = /** @class */ (function () {
    function EditComponent(service, localizer, snackBar, route, router, listUrl) {
        var _this = this;
        this._destroyed = new Subject();
        this._listUrl = listUrl;
        this._service = service;
        this._router = router;
        this._localizer = localizer;
        this._snackBar = snackBar;
        if (!this.id) {
            route.params.subscribe(function (params) { return _this.id = params['id']; });
        }
    }
    EditComponent.prototype.getCreateModel = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getCreateModel().pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.itemCreate = data;
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    EditComponent.prototype.getEditModel = function (id) {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getEditModel(id).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.itemEdit = data;
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    EditComponent.prototype.ngOnInit = function () {
        if (this.id) {
            this.getEditModel(this.id);
        }
        else {
            this.getCreateModel();
        }
    };
    EditComponent.prototype.saveCreateModel = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveCreateModel(this.itemCreate).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.getCreateModel();
            _this._router.navigate([_this._listUrl + '/edit/' + data.id]);
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    EditComponent.prototype.saveEditModel = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveEditModel(this.itemEdit).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.getCreateModel();
            var popup = _this._snackBar.open(_this._localizer.localize("EditSuccess"), null, { duration: 5000 });
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EditComponent.prototype, "id", void 0);
    EditComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [CoreService, CoreLocalizerService, MatSnackBar, ActivatedRoute, Router, String])
    ], EditComponent);
    return EditComponent;
}());
export { EditComponent };
//# sourceMappingURL=edit.component.js.map