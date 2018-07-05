var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
        this.isExpanded = false;
    }
    MenuComponent.prototype.collapse = function () {
        this.isExpanded = false;
    };
    MenuComponent.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
    };
    MenuComponent = __decorate([
        Component({
            selector: 'menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css']
        })
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map