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
import { DependentService } from '../Services/dependent.service';
import { ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
var DependentComponent = /** @class */ (function () {
    function DependentComponent(service, localizer, snackBar, route) {
        var _this = this;
        this._destroyed = new Subject();
        this.currentPage = 1;
        this.totalPages = 1;
        this.pageSize = 10;
        this.isShowCreate = false;
        this.showEditId = null;
        this.checkedItems = [];
        this.checkAllChecked = [];
        this.importFile = null;
        this.orderBy = 'Id_desc';
        this._service = service;
        this._localizer = localizer;
        this._snackBar = snackBar;
        if (!this.parentId) {
            route.params.subscribe(function (params) { return _this.parentId = params['parentId']; });
        }
    }
    DependentComponent.prototype.getCreateModel = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getCreateModel(this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.itemCreate = data;
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.getEditModel = function (id) {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getEditModel(id, this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.itemEdit = data;
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getParent(this.parentId).pipe(takeUntil(this._destroyed)).subscribe(function (data) { _this.parent = data; });
        this._service.getFilterModel(this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.filter = data;
            _this.reloadGrid();
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.reloadGrid = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this.showEditId = null;
        this._service.getPagesCount(this.pageSize, this.parentId, this.filter).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.totalPages = data;
            if (_this.currentPage < 1)
                _this.currentPage = 1;
            if (_this.currentPage > _this.totalPages)
                _this.currentPage = _this.totalPages;
            _this._service.getGrid(_this.parentId, _this.currentPage, _this.pageSize, _this.orderBy, _this.filter).pipe(finalize(function () { if (popup)
                popup.dismiss(); }), takeUntil(_this._destroyed)).subscribe(function (data) { _this.items = data; if (popup)
                popup.dismiss(); }, function (e) {
                console.log(e);
                if (e.error) {
                    var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
                }
            });
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.clearFilter = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getFilterModel(this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.filter = data;
            _this.reloadGrid();
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.nextPage = function () {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.reloadGrid();
        }
    };
    DependentComponent.prototype.prevPage = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.reloadGrid();
        }
    };
    DependentComponent.prototype.toggleCreate = function () {
        if (this.isShowCreate) {
            this.isShowCreate = false;
        }
        else {
            this.getCreateModel();
            this.isShowCreate = true;
            this.isShowImport = false;
        }
    };
    DependentComponent.prototype.toggleImport = function () {
        if (this.isShowImport) {
            this.isShowImport = false;
        }
        else {
            this.isShowImport = true;
            this.isShowCreate = false;
        }
    };
    DependentComponent.prototype.toggleEdit = function (id) {
        if (this.showEditId == id) {
            this.showEditId = null;
        }
        else {
            this.getEditModel(id);
            this.showEditId = id;
        }
    };
    DependentComponent.prototype.delete = function (id) {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.delete(id, this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.reloadGrid();
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.deleteChecked = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.deleteMany(this.checkedItems, this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.reloadGrid();
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.saveCreateModel = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveCreateModel(this.itemCreate, this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.isShowCreate = false;
            _this.getCreateModel();
            _this.reloadGrid();
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.saveEditModel = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveEditModel(this.itemEdit, this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            _this.itemEdit = data;
            _this.reloadGrid();
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.getExcelExport = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getExcelExport(this.parentId, this.orderBy, this.filter).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            saveAs(data, "ExcelExport.xlsx");
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.getImportTemplate = function () {
        var _this = this;
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getImportTemplate(this.parentId).pipe(finalize(function () { if (popup)
            popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
            saveAs(data, "ImportTemplate.xlsx");
        }, function (e) {
            console.log(e);
            if (e.error) {
                var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", e.error));
            }
        });
    };
    DependentComponent.prototype.import = function () {
        var _this = this;
        if (this.importFile == null) {
            var popup = this._snackBar.open(this._localizer.localize("ImportFileNull"), null, { duration: 5000 });
        }
        else {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._service.import(this.parentId, this.importFile).pipe(finalize(function () { if (popup)
                popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(function (data) {
                _this.reloadGrid();
                var popup = _this._snackBar.open(_this._localizer.localize("ImportSuccess"), null, { duration: 5000 });
            }, function (e) {
                console.log(e);
                if (e.error) {
                    var popup = _this._snackBar.open(_this._localizer.localizeWithValues("Error", JSON.stringify(e.error)));
                }
            });
        }
    };
    DependentComponent.prototype.setImportFile = function (file) {
        this.importFile = file;
    };
    DependentComponent.prototype.toggleChecked = function (id) {
        var index = this.checkedItems.indexOf(id);
        if (index < 0) {
            this.checkedItems.push(id);
        }
        else {
            this.checkedItems = this.checkedItems.slice(0, index).concat(this.checkedItems.slice(index + 1, this.checkedItems.length));
        }
    };
    DependentComponent.prototype.toggleCheckAll = function () {
        var _this = this;
        var checked = true;
        this.items.forEach(function (i) {
            var index = _this.checkedItems.indexOf(i.id);
            if (index < 0)
                checked = false;
        });
        if (checked) {
            this.items.forEach(function (i) {
                var index = _this.checkedItems.indexOf(i.id);
                _this.checkedItems = _this.checkedItems.slice(0, index).concat(_this.checkedItems.slice(index + 1, _this.checkedItems.length));
            });
        }
        else {
            this.items.forEach(function (i) {
                var index = _this.checkedItems.indexOf(i.id);
                if (index < 0) {
                    _this.checkedItems.push(i.id);
                }
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DependentComponent.prototype, "parentId", void 0);
    DependentComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [DependentService, CoreLocalizerService, MatSnackBar, ActivatedRoute])
    ], DependentComponent);
    return DependentComponent;
}());
export { DependentComponent };
//# sourceMappingURL=dependent.component.js.map