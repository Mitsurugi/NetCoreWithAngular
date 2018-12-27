import { Component, OnInit } from '@angular/core';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {    
    _isExpanded = false;
    _accGlobals: AccountGlobals;

    constructor(accGlobals: AccountGlobals) {
        this._accGlobals = accGlobals;
    }

    ngOnInit() {
        this._accGlobals.refresh();
    }

    collapse() {
        this._isExpanded = false;
    }

    toggle() {
        this._isExpanded = !this._isExpanded;
    }
}