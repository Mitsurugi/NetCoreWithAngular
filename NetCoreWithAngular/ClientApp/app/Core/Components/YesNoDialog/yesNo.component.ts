import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreLocalizerService } from '../../Localization/coreLocalizer.service';

@Component({
    selector: 'yesNo',
    templateUrl: './yesNo.component.html',
    styleUrls: ['./yesNo.component.css'],
    providers: [CoreLocalizerService]
})

export class YesNoComponent {

    private _localizer: CoreLocalizerService;
    private _dialogRef: MatDialogRef<YesNoComponent>;
    text: string;

    constructor(localizer: CoreLocalizerService, dialogRef: MatDialogRef<YesNoComponent>, @Inject(MAT_DIALOG_DATA) data: string)
    {
        this._localizer = localizer;
        this._dialogRef = dialogRef;
        this.text = data;
    }

    noClick(): void {
        this._dialogRef.close(false);
    }

    yesClick(): void {
        this._dialogRef.close(true);
    }
}