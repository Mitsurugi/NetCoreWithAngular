import { Component, OnInit } from '@angular/core';
import { AccountGlobals } from '../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {        
    protected _accGlobals: AccountGlobals;
    protected _localizer: LocalizerService;

    isExpanded = false;

    constructor(accGlobals: AccountGlobals, localizer: LocalizerService) {
        this._accGlobals = accGlobals;
        this._localizer = localizer;
    }

    ngOnInit() {
        this._accGlobals.refresh();
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}