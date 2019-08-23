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
import { StaticMethods } from '../Services/staticMethods';
var DependentService = /** @class */ (function () {
    function DependentService(http) {
        this._controller = "";
        this._http = http;
    }
    DependentService.prototype.getPagesCount = function (pageSize, parentId, filter) {
        return this._http.get('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize + '&parentId=' + parentId, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    DependentService.prototype.getGrid = function (parentId, pageNumber, pageSize, orderBy, filter) {
        return this._http.get('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&parentId=' + parentId + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    DependentService.prototype.getCreateModel = function (parentId) {
        return this._http.get('api/' + this._controller + '/getCreateModel?parentId=' + parentId);
    };
    DependentService.prototype.saveCreateModel = function (item, parentId) {
        return this._http.post('/api/' + this._controller + '/saveCreateModel?parentId=' + parentId, item);
    };
    DependentService.prototype.getEditModel = function (id, parentId) {
        return this._http.get('api/' + this._controller + '/getEditModel?id=' + id + '&parentId=' + parentId);
    };
    DependentService.prototype.saveEditModel = function (item, parentId) {
        return this._http.post('/api/' + this._controller + '/saveEditModel?parentId=' + parentId, item);
    };
    DependentService.prototype.delete = function (id, parentId) {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id + '&parentId=' + parentId);
    };
    DependentService.prototype.deleteMany = function (ids, parentId) {
        return this._http.delete('api/' + this._controller + '/deleteMany?parentId=' + parentId, { params: StaticMethods.ArrayToHttpParams('ids', ids) });
    };
    DependentService.prototype.getFilterModel = function (parentId) {
        return this._http.get('api/' + this._controller + '/getFilterModel?parentId=' + parentId);
    };
    DependentService.prototype.getExcelExport = function (parentId, orderBy, filter) {
        return this._http.get('api/' + this._controller + '/getExcelExport?parentId=' + parentId + '&orderBy=' + orderBy, { responseType: 'blob', params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    DependentService.prototype.getImportTemplate = function (parentId) {
        return this._http.get('api/' + this._controller + '/getImportTemplate?parentId=' + parentId, { responseType: 'blob' });
    };
    DependentService.prototype.import = function (pareintId, file) {
        var formData = new FormData();
        formData.append("file", file);
        return this._http.post('/api/' + this._controller + '/import?parentId=' + pareintId, formData);
    };
    DependentService.prototype.getParent = function (parentId) {
        return this._http.get('api/' + this._controller + '/getParent?parentId=' + parentId);
    };
    DependentService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DependentService);
    return DependentService;
}());
export { DependentService };
//# sourceMappingURL=dependent.service.js.map