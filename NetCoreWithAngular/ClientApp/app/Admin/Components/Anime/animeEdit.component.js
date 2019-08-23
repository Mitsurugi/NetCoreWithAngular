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
import { EditComponent } from '../../../Core/Components/edit.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../Core/Services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
var AnimeEditComponent = /** @class */ (function (_super) {
    __extends(AnimeEditComponent, _super);
    function AnimeEditComponent(service, localizer, fileService, route, router, snackBar) {
        var _this = _super.call(this, service, localizer, snackBar, route, router, 'admin/anime') || this;
        _this._fileService = fileService;
        return _this;
    }
    AnimeEditComponent.prototype.deleteImageEdit = function () {
        var _this = this;
        if (this.itemEdit.imageId != null) {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._fileService.delete(this.itemEdit.imageId).pipe(finalize(function () { if (popup)
                popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
                _this.itemEdit.imageId = null;
            }, function (e) {
                console.log(e);
                if (e.error) {
                    var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
                }
            });
        }
    };
    AnimeEditComponent.prototype.deleteImageCreate = function () {
        var _this = this;
        if (this.itemCreate.imageId != null) {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._fileService.delete(this.itemCreate.imageId).pipe(finalize(function () { if (popup)
                popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
                _this.itemCreate.imageId = null;
            }, function (e) {
                console.log(e);
                if (e.error) {
                    var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
                }
            });
        }
    };
    AnimeEditComponent.prototype.uploadImageEdit = function (file) {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._fileService.upload(file).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.itemEdit.imageId = data;
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    AnimeEditComponent.prototype.uploadImageCreate = function (file) {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._fileService.upload(file).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this._fileService.delete(_this.itemCreate.imageId).pipe(takeUntil(_this._destroyed)).subscribe(function () {
                _this.itemCreate.imageId = data;
            });
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    AnimeEditComponent = __decorate([
        Component({
            selector: 'anime-edit',
            templateUrl: './animeEdit.component.html',
            styleUrls: ['./animeEdit.component.css'],
            providers: [AnimeService, FileService]
        }),
        __metadata("design:paramtypes", [AnimeService, LocalizerService, FileService, ActivatedRoute, Router, MatSnackBar])
    ], AnimeEditComponent);
    return AnimeEditComponent;
}(EditComponent));
export { AnimeEditComponent };
//# sourceMappingURL=animeEdit.component.js.map