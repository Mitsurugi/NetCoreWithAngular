import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreAccountComponent } from '../../../../Core/Account/account.component';
import { AccountService } from '../../Services/account.service';
import { AccountGlobals } from '../../../../Core/Account/AccountGlobals';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [AccountService]
})
export class AccountComponent extends CoreAccountComponent {

    constructor(service: AccountService, accGlobals: AccountGlobals) {
        super(service, accGlobals);
    }
}