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
import { Input, Component } from '@angular/core';
import { DependentService } from '../Services/dependent.service';
import { ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';
var DependentComponent = /** @class */ (function () {
    function DependentComponent(service, typeGrid, typeCreate, typeEdit, typeFilter, route) {
        var _this = this;
        this._currentPage = 1;
        this._pageSize = 5;
        this._totalPages = 1;
        this._error = null;
        this._isShowCreate = false;
        this._showEditId = null;
        this._checkedItems = [];
        this._checkAllChecked = [];
        this._importFile = null;
        this._orderBy = 'Id_desc';
        this._service = service;
        this._items = new Array();
        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this._filter = new typeFilter();
        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;
        if (!this._parentId) {
            route.params.subscribe(function (params) { return _this._parentId = params['parentId']; });
        }
    }
    DependentComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this._service.getFilter()];
                    case 1:
                        _a._filter = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._service.getParent(this._parentId)];
                    case 2:
                        _b._parent = _c.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        this._error = e_1.error.Message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.reloadGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this._error = null;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        this._showEditId = null;
                        _a = this;
                        return [4 /*yield*/, this._service.getPagesCount(this._pageSize, this._parentId, this._filter)];
                    case 2:
                        _a._totalPages = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._service.getGrid(this._parentId, this._currentPage, this._pageSize, this._orderBy, this._filter)];
                    case 3:
                        _b._items = _c.sent();
                        return [4 /*yield*/, this.getCreate()];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _c.sent();
                        this._error = e_2.error.Message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.clearFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._filter = new this.typeFilter();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this._service.getFilter()];
                    case 2:
                        _a._filter = _b.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _b.sent();
                        this._error = e_3.error.Message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.nextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._currentPage < this._totalPages)) return [3 /*break*/, 4];
                        this._currentPage++;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reloadGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        this._error = e_4.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.prevPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._currentPage > 1)) return [3 /*break*/, 4];
                        this._currentPage--;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reloadGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        this._error = e_5.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.toggleCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isShowCreate) return [3 /*break*/, 1];
                        this._isShowCreate = false;
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getCreate()];
                    case 2:
                        _a.sent();
                        this._isShowCreate = true;
                        this._isShowImport = false;
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        this._error = e_6.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.toggleImport = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._isShowImport) {
                    this._isShowImport = false;
                }
                else {
                    try {
                        this._isShowImport = true;
                        this._isShowCreate = false;
                    }
                    catch (e) {
                        this._error = e.error.Message;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    DependentComponent.prototype.toggleEdit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._showEditId == id)) return [3 /*break*/, 1];
                        this._showEditId = null;
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getEdit(id)];
                    case 2:
                        _a.sent();
                        this._showEditId = id;
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        this._error = e_7.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.getCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._error = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this._service.getCreate(this._parentId)];
                    case 2:
                        _a._itemCreate = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_8 = _b.sent();
                        this._error = e_8.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.getEdit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._error = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this._service.getEdit(id)];
                    case 2:
                        _a._itemEdit = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _b.sent();
                        this._error = e_9.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._service.delete(id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_10 = _a.sent();
                        this._error = e_10.error.Message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.deleteChecked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._service.deleteMany(this._checkedItems)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_11 = _a.sent();
                        this._error = e_11.error.Message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.postCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this._service.postCreate(this._itemCreate)];
                    case 2:
                        _a.sent();
                        this._isShowCreate = false;
                        return [4 /*yield*/, this.getCreate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_12 = _a.sent();
                        this._error = e_12.error.Message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.postEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._error = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this._service.postEdit(this._itemEdit)];
                    case 2:
                        _a._itemEdit = _b.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_13 = _b.sent();
                        this._error = e_13.error.Message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.excelExport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var b, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._service.getExcelExport(this._parentId, this._orderBy, this._filter)];
                    case 2:
                        b = _a.sent();
                        saveAs(b, "ExcelExport.xlsx");
                        return [3 /*break*/, 4];
                    case 3:
                        e_14 = _a.sent();
                        this._error = e_14.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.importTemplate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var b, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._service.getImportTemplate()];
                    case 2:
                        b = _a.sent();
                        saveAs(b, "ImportTemplate.xlsx");
                        return [3 /*break*/, 4];
                    case 3:
                        e_15 = _a.sent();
                        this._error = e_15.error.Message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.postImport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._importFile == null)) return [3 /*break*/, 1];
                        this._importResult = "Файл импорта не выбран";
                        return [3 /*break*/, 5];
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._service.postImport(this._parentId, this._importFile)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.reloadGrid()];
                    case 3:
                        _a.sent();
                        this._importResult = "Импорт прошел успешно";
                        return [3 /*break*/, 5];
                    case 4:
                        e_16 = _a.sent();
                        this._importResult = JSON.stringify(e_16.error.Message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DependentComponent.prototype.setImportFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._importFile = file;
                return [2 /*return*/];
            });
        });
    };
    DependentComponent.prototype.toggleChecked = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = this._checkedItems.indexOf(id);
                if (index < 0) {
                    this._checkedItems.push(id);
                }
                else {
                    this._checkedItems = this._checkedItems.slice(0, index).concat(this._checkedItems.slice(index + 1, this._checkedItems.length));
                }
                return [2 /*return*/];
            });
        });
    };
    DependentComponent.prototype.toggleCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checked;
            var _this = this;
            return __generator(this, function (_a) {
                checked = true;
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
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DependentComponent.prototype, "_parentId", void 0);
    DependentComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [DependentService, Function, Function, Function, Function, ActivatedRoute])
    ], DependentComponent);
    return DependentComponent;
}());
export { DependentComponent };
//# sourceMappingURL=dependent.component.js.map