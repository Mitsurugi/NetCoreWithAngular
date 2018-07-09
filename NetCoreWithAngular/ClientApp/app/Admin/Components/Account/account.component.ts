import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreAccountComponent } from '../../../../Core/account.component';
import { AccountService } from '../../Services/account.service';
import { LoginModel } from '../../Models/login';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [AccountService]
})
export class AccountComponent extends CoreAccountComponent<LoginModel> {

    constructor(service: AccountService) {
        super(service, LoginModel);
    }
}