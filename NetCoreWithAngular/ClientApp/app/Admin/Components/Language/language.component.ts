import { Component, OnInit } from '@angular/core';
import { CoreLanguageComponent } from '../../../../Core/Localization/language.component';

@Component({
    selector: 'language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.css']
})
export class LanguageComponent extends CoreLanguageComponent {

    constructor() {
        super();
    }
}