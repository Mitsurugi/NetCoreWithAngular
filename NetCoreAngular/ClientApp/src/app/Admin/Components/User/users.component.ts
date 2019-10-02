import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../Core/Users/users.service';
import { UsersBaseComponent } from '../../../Core/Users/usersBase.component';
import { User } from '../../Models/User/user';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [UsersService]
})
export class UsersComponent extends UsersBaseComponent<string, User> {

    constructor(service: UsersService<string, User>, localizer: LocalizerService, snackBar: MatSnackBar, dualog: MatDialog) {
        super(service, localizer, snackBar, dualog);
    }
}
