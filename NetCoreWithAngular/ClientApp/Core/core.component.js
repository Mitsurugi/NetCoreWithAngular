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
import { CoreService } from './core.service';
var CoreComponent = /** @class */ (function () {
    function CoreComponent(service, typeGrid, typeCreate, typeEdit, typeFilter) {
        this.currentPage = 1;
        this.pageSize = 5;
        this.totalPages = 1;
        this.error = null;
        this.isShowCreate = false;
        this.isShowEdit = new Array();
        this._service = service;
        this.items = new Array();
        this.itemEdit = new typeEdit();
        this.itemCreate = new typeCreate();
        this.filter = new typeFilter();
        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;
    }
    CoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refreshPage();
        this._service.getFilter().subscribe(function (data) { return _this.filter = data; }, function (e) { _this.error = JSON.stringify(e.error); });
    };
    CoreComponent.prototype.refreshPage = function () {
        var _this = this;
        this.error = null;
        this._service.getPagesCount(this.pageSize, this.filter).subscribe(function (data) { return _this.totalPages = data; }, function (e) { _this.error = JSON.stringify(e.error); });
        this._service.getGrid(this.currentPage, this.pageSize, this.filter).subscribe(function (data) { return _this.items = data; }, function (e) { _this.error = JSON.stringify(e.error); });
        this.isShowEdit = new Array();
        for (var i = 0; i < this.items.length; i++) {
            this.isShowEdit.push(false);
        }
    };
    CoreComponent.prototype.clearFilter = function () {
        var _this = this;
        this.filter = new this.typeFilter();
        this._service.getFilter().subscribe(function (data) { return _this.filter = data; }, function (e) { _this.error = JSON.stringify(e.error); });
        this.refreshPage();
    };
    CoreComponent.prototype.nextPage = function () {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.refreshPage();
        }
    };
    CoreComponent.prototype.prevPage = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.refreshPage();
        }
    };
    CoreComponent.prototype.toggleCreate = function () {
        if (this.isShowCreate) {
            this.isShowCreate = false;
        }
        else {
            this.getCreate();
            this.isShowCreate = true;
        }
    };
    CoreComponent.prototype.toggleEdit = function (index, id) {
        if (this.isShowEdit[index]) {
            this.isShowEdit[index] = false;
        }
        else {
            this.getEdit(id);
            this.isShowEdit[index] = true;
        }
    };
    CoreComponent.prototype.getCreate = function () {
        var _this = this;
        this.error = null;
        this._service.getCreate().subscribe(function (data) { return _this.itemCreate = data; }, function (e) { _this.error = JSON.stringify(e.error); });
    };
    CoreComponent.prototype.getEdit = function (id) {
        var _this = this;
        this.error = null;
        this._service.getEdit(id).subscribe(function (data) { return _this.itemEdit = data; }, function (e) { _this.error = JSON.stringify(e.error); });
    };
    CoreComponent.prototype.delete = function (id) {
        var _this = this;
        this.error = null;
        this._service.delete(id).subscribe(function (data) { _this.refreshPage(); }, function (e) { _this.error = JSON.stringify(e.error); });
    };
    CoreComponent.prototype.postCreate = function () {
        var _this = this;
        this.error = null;
        this._service.postCreate(this.itemCreate).subscribe(function (data) { _this.getCreate(); _this.isShowCreate = false; _this.refreshPage(); }, function (e) { _this.error = JSON.stringify(e.error); });
    };
    CoreComponent.prototype.postEdit = function () {
        var _this = this;
        this.error = null;
        this._service.postEdit(this.itemEdit).subscribe(function (data) { _this.itemEdit = data; _this.refreshPage(); }, function (e) { _this.error = JSON.stringify(e.error); });
    };
    CoreComponent = __decorate([
        Component({}),
        __metadata("design:paramtypes", [CoreService, Function, Function, Function, Function])
    ], CoreComponent);
    return CoreComponent;
}());
export { CoreComponent };
//# sourceMappingURL=core.component.js.map