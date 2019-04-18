import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreAccountComponent } from '../../../../Core/Account/account.component';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [AccountService]
})
export class AccountComponent extends CoreAccountComponent {

    constructor(service: AccountService, localizer: LocalizerService, accGlobals: AccountGlobals, router: Router) {
        super(service, localizer, accGlobals, router);
    }
}