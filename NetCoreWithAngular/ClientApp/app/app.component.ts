import { Component } from '@angular/core';
import { AccountGlobals } from '../Core/Account/AccountGlobals';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AccountGlobals]
})
export class AppComponent {

}