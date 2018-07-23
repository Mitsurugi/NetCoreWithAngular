import { Component, OnInit } from '@angular/core';
import { AccountGlobals } from '../../../../Core/AccountGlobals';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {
    _isExpanded = false;
    _accGlobals: AccountGlobals;

    constructor(accGlobals: AccountGlobals) {
        this._accGlobals = accGlobals;
    }

    collapse() {
        this._isExpanded = false;
    }

    toggle() {
        this._isExpanded = !this._isExpanded;
    }
}