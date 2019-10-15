import { Input, Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from "@angular/router";
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

@Component({
})
export class EditComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey> = TGrid, TEdit extends IEntity<TKey> = TGrid, TFilter = TGrid> implements OnInit {

    protected _destroyed: Subject<void> = new Subject();
    protected _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;
    protected _router: Router;
    protected _listUrl: string;
    protected _localizer: CoreLocalizerService;
    protected _snackBar: MatSnackBar;

    @Input() id?: TKey;

    itemEdit: TEdit;
    itemCreate: TCreate;

    constructor(service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, snackBar: MatSnackBar, route: ActivatedRoute, router: Router, listUrl: string) {

        this._listUrl = listUrl;

        this._service = service;
        this._router = router;
        this._localizer = localizer;
        this._snackBar = snackBar;

        if (!this.id) {
            route.params.pipe(takeUntil(this._destroyed)).subscribe(params => this.id = params['id']);
        }
    }

    protected getCreateModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getCreateModel().pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.itemCreate = data;
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    protected getEditModel(id: TKey) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getEditModel(id).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.itemEdit = data;
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    ngOnInit() {
        if (this.id) {
            this.getEditModel(this.id);
        } else {
            this.getCreateModel();
        }
    }

    saveCreateModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveCreateModel(this.itemCreate).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.getCreateModel();
                this._router.navigate([this._listUrl + '/edit/' + data.id]);
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    saveEditModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveEditModel(this.itemEdit).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.getCreateModel();
                var popup = this._snackBar.open(this._localizer.localize("EditSuccess"), null, { duration: 5000 });
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }
}
