import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreAccountComponent } from '../../../../Core/Account/account.component';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [AccountService]
})
export class AccountComponent extends CoreAccountComponent {

    _localizer: LocalizerService;

    constructor(service: AccountService, localizer: LocalizerService, accGlobals: AccountGlobals) {
        super(service, accGlobals);

        this._localizer = localizer;
    }
}