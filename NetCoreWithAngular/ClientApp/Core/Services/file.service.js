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
var FileService = /** @class */ (function () {
    function FileService(http) {
        this._controller = "file";
        this._http = http;
    }
    FileService.prototype.delete = function (id) {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    };
    FileService.prototype.upload = function (file) {
        var formData = new FormData();
        formData.append("file", file);
        return this._http.post('/api/' + this._controller + '/upload', formData);
    };
    FileService.prototype.download = function (id) {
        return this._http.get('api/' + this._controller + '/download?id=' + id, { responseType: 'blob' });
    };
    FileService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], FileService);
    return FileService;
}());
export { FileService };
//# sourceMappingURL=file.service.js.map