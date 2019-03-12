import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { read } from 'fs';
import { UsersService } from '../../../../Core/Users/users.service';
import { UsersBaseComponent } from '../../../../Core/Users/usersBase.component';
import { User } from '../../Models/User/user';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [UsersService]
})
export class UsersComponent extends UsersBaseComponent<string, User> {

    constructor(service: UsersService<string, User>) {
        super(service, User, User, User, User);
    }
}