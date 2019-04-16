import { Component } from '@angular/core';
import { AccountGlobals } from '../Core/Account/AccountGlobals';
import { LocalizerService } from './Localizer/localizer.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AccountGlobals, LocalizerService]
})
export class AppComponent {

}