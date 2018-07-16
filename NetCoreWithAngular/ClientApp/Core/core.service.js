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
var CoreService = /** @class */ (function () {
    function CoreService(http) {
        this._controller = "";
        this._http = http;
    }
    CoreService.prototype.getPagesCount = function (pageSize, filter) {
        return this._http.post('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, filter);
    };
    CoreService.prototype.getGrid = function (pageNumber, pageSize, filter) {
        return this._http.post('api/' + this._controller + '/grid?pageNumber=' + pageNumber + '&pageSize=' + pageSize, filter);
    };
    CoreService.prototype.getCreate = function () {
        return this._http.get('api/' + this._controller + '/create');
    };
    CoreService.prototype.postCreate = function (item) {
        return this._http.post('/api/' + this._controller + '/create', item);
    };
    CoreService.prototype.getEdit = function (id) {
        return this._http.get('api/' + this._controller + '/edit?id=' + id);
    };
    CoreService.prototype.postEdit = function (item) {
        return this._http.post('/api/' + this._controller + '/edit', item);
    };
    CoreService.prototype.delete = function (id) {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    };
    CoreService.prototype.getFilter = function () {
        return this._http.get('api/' + this._controller + '/getFilter');
    };
    CoreService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], CoreService);
    return CoreService;
}());
export { CoreService };
//# sourceMappingURL=core.service.js.map