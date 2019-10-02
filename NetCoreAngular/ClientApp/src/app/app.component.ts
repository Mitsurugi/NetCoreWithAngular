import { Component } from '@angular/core';
import { AccountGlobals } from './Core/Account/AccountGlobals';
import { LocalizerService } from './Localizer/localizer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [AccountGlobals, LocalizerService]
})
export class AppComponent {
    title = 'NetCoreAngular';
}
