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
import { Component } from '@angular/core';
import { DependentComponent } from '../../../Core/Components/dependent.component';
import { AnimeEpisodeService } from '../../Services/animeEpisode.service';
import { ActivatedRoute } from "@angular/router";
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
var AnimeEpisodeComponent = /** @class */ (function (_super) {
    __extends(AnimeEpisodeComponent, _super);
    function AnimeEpisodeComponent(service, localizer, route, snackBar, dialog) {
        return _super.call(this, service, localizer, snackBar, dialog, route) || this;
    }
    AnimeEpisodeComponent = __decorate([
        Component({
            selector: 'anime-episodes',
            templateUrl: './animeEpisode.component.html',
            styleUrls: ['./animeEpisode.component.css'],
            providers: [AnimeEpisodeService]
        }),
        __metadata("design:paramtypes", [AnimeEpisodeService, LocalizerService, ActivatedRoute, MatSnackBar, MatDialog])
    ], AnimeEpisodeComponent);
    return AnimeEpisodeComponent;
}(DependentComponent));
export { AnimeEpisodeComponent };
//# sourceMappingURL=animeEpisode.component.js.map