import { Input, Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from "@angular/router";
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
})
export class EditComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey> = TGrid, TEdit extends IEntity<TKey> = TGrid, TFilter = TGrid> implements OnInit {    

    _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;
    _router: Router;
    _listUrl: string;
    _localizer: CoreLocalizerService;
    _snackBar: MatSnackBar;

    @Input() _id?: TKey;

    _itemEdit: TEdit;
    _itemCreate: TCreate;

    constructor(service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, snackBar: MatSnackBar, route: ActivatedRoute, router: Router, listUrl: string) {

        this._listUrl = listUrl;

        this._service = service;
        this._router = router;
        this._localizer = localizer;
        this._snackBar = snackBar;

        if (!this._id) {
            route.params.subscribe(params => this._id = params['id']);
        }
        
    }

    protected async getCreateModelAsync() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        try {
            this._itemCreate = await this._service.getCreateModelAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    protected async getEditModelAsync() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        try {
            this._itemEdit = await this._service.getEditModelAsync(this._id);
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async ngOnInit() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        try {
            if (this._id) {
                this.getEditModelAsync();
            } else {
                this.getCreateModelAsync();
            }
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }    

    public async saveCreateModelAsync() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));        
        try {
            var result = await this._service.saveCreateModelAsync(this._itemCreate);
            await this.getCreateModelAsync();
            popup.dismiss();
            this._router.navigate([this._listUrl + '/edit/' + result.id]);
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async saveEditModelAsync() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        try {
            this._itemEdit = await this._service.saveEditModelAsync(this._itemEdit);
            popup = this._snackBar.open(this._localizer.localize("EditSuccess"), null, { duration: 5000 });
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }
}