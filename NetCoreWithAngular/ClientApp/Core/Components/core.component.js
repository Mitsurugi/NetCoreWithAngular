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
import { CoreService } from '../Services/core.service';
import { saveAs } from 'file-saver';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
var CoreComponent = /** @class */ (function () {
    function CoreComponent(service, localizer, snackBar, typeGrid, typeCreate, typeEdit, typeFilter) {
        this._currentPage = 1;
        this._pageSize = 20;
        this._totalPages = 1;
        this._isShowCreate = false;
        this._showEditId = null;
        this._checkedItems = [];
        this._importFile = null;
        this._orderBy = '';
        this._service = service;
        this._localizer = localizer;
        this._snackBar = snackBar;
        this._items = new Array();
        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this._filter = new typeFilter();
        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;
    }
    CoreComponent.prototype.getCreateModelAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, _a, e_1, popup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a = this;
                        return [4 /*yield*/, this._service.getCreateModelAsync()];
                    case 1:
                        _a._itemCreate = _b.sent();
                        popup.dismiss();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_1.error));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.getEditModelAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var popup, _a, e_2, popup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a = this;
                        return [4 /*yield*/, this._service.getEditModelAsync(id)];
                    case 1:
                        _a._itemEdit = _b.sent();
                        popup.dismiss();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_2.error));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, _a, e_3, popup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a = this;
                        return [4 /*yield*/, this._service.getFilterModelAsync()];
                    case 1:
                        _a._filter = _b.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 2:
                        _b.sent();
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _b.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_3.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.reloadGridAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, _a, _b, e_4, popup;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        this._showEditId = null;
                        _a = this;
                        return [4 /*yield*/, this._service.getPagesCountAsync(this._pageSize, this._filter)];
                    case 1:
                        _a._totalPages = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._service.getGridAsync(this._currentPage, this._pageSize, this._orderBy, this._filter)];
                    case 2:
                        _b._items = _c.sent();
                        return [4 /*yield*/, this.getCreateModelAsync()];
                    case 3:
                        _c.sent();
                        popup.dismiss();
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _c.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_4.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.clearFilterAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, _a, e_5, popup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._filter = new this.typeFilter();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a = this;
                        return [4 /*yield*/, this._service.getFilterModelAsync()];
                    case 2:
                        _a._filter = _b.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 3:
                        _b.sent();
                        popup.dismiss();
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _b.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_5.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.nextPageAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_6, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._currentPage < this._totalPages)) return [3 /*break*/, 4];
                        this._currentPage++;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 2:
                        _a.sent();
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_6.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.prevPageAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_7, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._currentPage > 1)) return [3 /*break*/, 4];
                        this._currentPage--;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 2:
                        _a.sent();
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_7.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.toggleCreateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_8, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isShowCreate) return [3 /*break*/, 1];
                        this._isShowCreate = false;
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this.getCreateModelAsync()];
                    case 2:
                        _a.sent();
                        this._isShowCreate = true;
                        this._isShowImport = false;
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_8 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_8.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.toggleImport = function () {
        if (this._isShowImport) {
            this._isShowImport = false;
        }
        else {
            try {
                this._isShowImport = true;
                this._isShowCreate = false;
            }
            catch (e) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    };
    CoreComponent.prototype.toggleEditAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_9, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._showEditId == id)) return [3 /*break*/, 1];
                        this._showEditId = null;
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this.getEditModelAsync(id)];
                    case 2:
                        _a.sent();
                        this._showEditId = id;
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_9.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.deleteAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_10, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.deleteAsync(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 2:
                        _a.sent();
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_10 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_10.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.deleteCheckedAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_11, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.deleteManyAsync(this._checkedItems)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 2:
                        _a.sent();
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_11 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_11.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.saveCreateModelAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, e_12, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.saveCreateModelAsync(this._itemCreate)];
                    case 1:
                        _a.sent();
                        this._isShowCreate = false;
                        return [4 /*yield*/, this.getCreateModelAsync()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 3:
                        _a.sent();
                        popup.dismiss();
                        return [3 /*break*/, 5];
                    case 4:
                        e_12 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_12.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.saveEditModelAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, _a, e_13, popup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        _a = this;
                        return [4 /*yield*/, this._service.saveEditModelAsync(this._itemEdit)];
                    case 1:
                        _a._itemEdit = _b.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 2:
                        _b.sent();
                        popup.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_13 = _b.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_13.error));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.getExcelExportAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, b, e_14, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.getExcelExportAsync(this._orderBy, this._filter)];
                    case 1:
                        b = _a.sent();
                        popup.dismiss();
                        saveAs(b, "ExcelExport.xlsx");
                        return [3 /*break*/, 3];
                    case 2:
                        e_14 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_14.error));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.getImportTemplateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup, b, e_15, popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        popup = this._snackBar.open(this._localizer.localize("Loading"));
                        return [4 /*yield*/, this._service.getImportTemplateAsync()];
                    case 1:
                        b = _a.sent();
                        popup.dismiss();
                        saveAs(b, "ImportTemplate.xlsx");
                        return [3 /*break*/, 3];
                    case 2:
                        e_15 = _a.sent();
                        popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e_15.error));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.importAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._importFile == null)) return [3 /*break*/, 1];
                        this._importResult = this._localizer.localize("ImportFileNull");
                        return [3 /*break*/, 5];
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this._importResult = this._localizer.localize("Loading");
                        return [4 /*yield*/, this._service.importAsync(this._importFile)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGridAsync()];
                    case 3:
                        _a.sent();
                        this._importResult = this._localizer.localize("ImportSuccess");
                        return [3 /*break*/, 5];
                    case 4:
                        e_16 = _a.sent();
                        this._importResult = JSON.stringify(this._localizer.localizeWithValues("Error", e_16.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CoreComponent.prototype.setImportFile = function (file) {
        this._importFile = file;
    };
    CoreComponent.prototype.toggleChecked = function (id) {
        var index = this._checkedItems.indexOf(id);
        if (index < 0) {
            this._checkedItems.push(id);
        }
        else {
            this._checkedItems = this._checkedItems.slice(0, index).concat(this._checkedItems.slice(index + 1, this._checkedItems.length));
        }
    };
    CoreComponent.prototype.toggleCheckAll = function () {
        var _this = this;
        var checked = true;
        this._items.forEach(function (i) {
            var index = _this._checkedItems.indexOf(i.id);
            if (index < 0)
                checked = false;
        });
        if (checked) {
            this._items.forEach(function (i) {
                var index = _this._checkedItems.indexOf(i.id);
                _this._checkedItems = _this._checkedItems.slice(0, index).concat(_this._checkedItems.slice(index + 1, _this._checkedItems.length));
            });
        }
        else {
            this._items.forEach(function (i) {
                var index = _this._checkedItems.indexOf(i.id);
                if (index < 0) {
                    _this._checkedItems.push(i.id);
                }
            });
        }
    };
    CoreComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [CoreService, CoreLocalizerService, MatSnackBar, Function, Function, Function, Function])
    ], CoreComponent);
    return CoreComponent;
}());
export { CoreComponent };
//# sourceMappingURL=core.component.js.map