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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { EditComponent } from '../../../../Core/Components/edit.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../../Core/Services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
var AnimeEditComponent = /** @class */ (function (_super) {
    __extends(AnimeEditComponent, _super);
    function AnimeEditComponent(service, localizer, fileService, route, router, snackBar) {
        var _this = _super.call(this, service, localizer, snackBar, route, router, 'admin/anime') || this;
        _this._fileService = fileService;
        return _this;
    }
    AnimeEditComponent.prototype.deleteImageEditAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_1, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(this._itemEdit.imageId != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._fileService.deleteAsync(this._itemEdit.imageId)];
                    case 2:
                        _a.sent();
                        this._itemEdit.imageId = null;
                        _a.label = 3;
                    case 3:
                        popup.dismiss();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_1.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AnimeEditComponent.prototype.deleteImageCreateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_2, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(this._itemCreate.imageId != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._fileService.deleteAsync(this._itemCreate.imageId)];
                    case 2:
                        _a.sent();
                        this._itemCreate.imageId = null;
                        _a.label = 3;
                    case 3:
                        popup.dismiss();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_2.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AnimeEditComponent.prototype.uploadImageEditAsync = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var popup, id, e_3, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._fileService.uploadAsync(file)];
                    case 2:
                        id = _a.sent();
                        this._itemEdit.imageId = id;
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_3.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AnimeEditComponent.prototype.uploadImageCreateAsync = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var popup, id, e_4, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.deleteImageCreateAsync()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._fileService.uploadAsync(file)];
                    case 3:
                        id = _a.sent();
                        this._itemCreate.imageId = id;
                        popup.dismiss();
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_4.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
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