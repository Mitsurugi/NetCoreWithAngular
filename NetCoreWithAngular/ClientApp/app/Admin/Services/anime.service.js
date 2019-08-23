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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../Core/Services/core.service';
import { FileService } from '../../Core/Services/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from "rxjs/operators";
var AnimeService = /** @class */ (function (_super) {
    __extends(AnimeService, _super);
    function AnimeService(http, fileService, sanitaizer) {
        var _this = _super.call(this, http) || this;
        _this._controller = 'anime';
        _this._fileService = fileService;
        _this._sanitizer = sanitaizer;
        return _this;
    }
    AnimeService.prototype.move = function (id, newPosition) {
        return this._http.post('api/' + this._controller + '/moveAsync?id=' + id + '&newPosition=' + newPosition, null);
    };
    AnimeService.prototype.getGrid = function (pageNumber, pageSize, orderBy, filter) {
        var _this = this;
        return _super.prototype.getGrid.call(this, pageNumber, pageSize, orderBy, filter).pipe(map(function (data) {
            data.forEach(function (i) {
                if (i.imageId) {
                    _this._fileService.download(i.imageId).subscribe(function (data) {
                        var url = window.URL.createObjectURL(data);
                        i.imageUrl = _this._sanitizer.bypassSecurityTrustResourceUrl(url);
                    });
                }
            });
            return data;
        }));
    };
    AnimeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, FileService, DomSanitizer])
    ], AnimeService);
    return AnimeService;
}(CoreService));
export { AnimeService };
//# sourceMappingURL=anime.service.js.map