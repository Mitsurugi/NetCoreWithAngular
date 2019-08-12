var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticMethods } from './staticMethods';
var CoreService = /** @class */ (function () {
    function CoreService(http) {
        this._controller = "";
        this._http = http;
    }
    CoreService.prototype.getPagesCount = function (pageSize, filter) {
        return this._http.get('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    CoreService.prototype.getGrid = function (pageNumber, pageSize, orderBy, filter) {
        return this._http.get('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    CoreService.prototype.getCreateModel = function () {
        return this._http.get('api/' + this._controller + '/getCreateModel');
    };
    CoreService.prototype.saveCreateModel = function (item) {
        return this._http.post('/api/' + this._controller + '/saveCreateModel', item);
    };
    CoreService.prototype.getEditModel = function (id) {
        return this._http.get('api/' + this._controller + '/getEditModel?id=' + id);
    };
    CoreService.prototype.saveEditModel = function (item) {
        return this._http.post('/api/' + this._controller + '/saveEditModel', item);
    };
    CoreService.prototype.delete = function (id) {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    };
    CoreService.prototype.deleteMany = function (ids) {
        return this._http.delete('api/' + this._controller + '/deleteMany', { params: StaticMethods.ArrayToHttpParams('ids', ids) });
    };
    CoreService.prototype.getFilterModel = function () {
        return this._http.get('api/' + this._controller + '/getFilterModel');
    };
    CoreService.prototype.getExcelExport = function (orderBy, filter) {
        return this._http.get('api/' + this._controller + '/getExcelExport?orderBy=' + orderBy, { responseType: 'blob', params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    CoreService.prototype.getImportTemplate = function () {
        return this._http.get('api/' + this._controller + '/getImportTemplate', { responseType: 'blob' });
    };
    CoreService.prototype.import = function (file) {
        var formData = new FormData();
        formData.append("file", file);
        return this._http.post('/api/' + this._controller + '/import', formData);
    };
    CoreService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], CoreService);
    return CoreService;
}());
export { CoreService };
//# sourceMappingURL=core.service.js.map