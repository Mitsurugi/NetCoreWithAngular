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
var UsersService = /** @class */ (function () {
    function UsersService(http) {
        this._controller = "users";
        this._http = http;
    }
    UsersService.prototype.getPagesCount = function (pageSize, filter) {
        return this._http.get('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    UsersService.prototype.getGrid = function (pageNumber, pageSize, orderBy, filter) {
        return this._http.get('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    UsersService.prototype.getCreateModel = function () {
        return this._http.get('api/' + this._controller + '/getCreateModel');
    };
    UsersService.prototype.saveCreateModel = function (item) {
        return this._http.post('/api/' + this._controller + '/saveCreateModel', item);
    };
    UsersService.prototype.getEditModel = function (id) {
        return this._http.get('api/' + this._controller + '/getEditModel?id=' + id);
    };
    UsersService.prototype.saveEditModel = function (item) {
        return this._http.post('/api/' + this._controller + '/saveEditModel', item);
    };
    UsersService.prototype.delete = function (id) {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    };
    UsersService.prototype.deleteMany = function (ids) {
        return this._http.delete('api/' + this._controller + '/deleteMany', { params: StaticMethods.ArrayToHttpParams('ids', ids) });
    };
    UsersService.prototype.getFilterModel = function () {
        return this._http.get('api/' + this._controller + '/getFilterModel');
    };
    UsersService.prototype.getExcelExport = function (orderBy, filter) {
        return this._http.get('api/' + this._controller + '/getExcelExport?orderBy=' + orderBy, { responseType: 'blob', params: StaticMethods.ObjectToHttpParams('filter', filter) });
    };
    UsersService.prototype.getImportTemplate = function () {
        return this._http.get('api/' + this._controller + '/getImportTemplate', { responseType: 'blob' });
    };
    UsersService.prototype.resetPassword = function (id, newPassword) {
        var formData = new FormData();
        formData.append("newPassword", newPassword);
        return this._http.post('/api/' + this._controller + '/ResetPassword?id=' + id, formData);
    };
    UsersService.prototype.import = function (file) {
        var formData = new FormData();
        formData.append("file", file);
        return this._http.post('/api/' + this._controller + '/import', formData);
    };
    UsersService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], UsersService);
    return UsersService;
}());
export { UsersService };
//# sourceMappingURL=users.service.js.map