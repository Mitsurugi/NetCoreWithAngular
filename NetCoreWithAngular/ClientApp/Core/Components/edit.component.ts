import { Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
})
export class EditComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey>, TEdit extends IEntity<TKey>, TFilter> implements OnInit {    

    _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;
    _router: Router;
    _listUrl: string;

    _id?: TKey;
    _itemEdit: TEdit;
    _itemCreate: TCreate;
    _error: string = null;
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);

    constructor(service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>, typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), route: ActivatedRoute, router: Router, listUrl: string) {

        this._listUrl = listUrl;

        this._service = service;
        this._router = router;

        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        route.params.subscribe(params => this._id = params['id']);
    }

    public async ngOnInit() {
        this._error = null;
        try {
            if (this._id) {
                this.getEdit();
            } else {
                this.getCreate();
            }
        }
        catch (e) {
            this._error = e.error;
        }
    }

    protected async getCreate() {
        this._error = null;
        try {
            this._itemCreate = await this._service.getCreate();
        }
        catch (e) {
            this._error = e.error;
        }
    }

    protected async getEdit() {
        this._error = null;
        try {
            this._itemEdit = await this._service.getEdit(this._id);
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async postCreate() {
        this._error = null;
        try {
            await this._service.postCreate(this._itemCreate);
            await this.getCreate();
            this._router.navigate([this._listUrl]);
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async postEdit() {
        this._error = null;
        try {
            this._itemEdit = await this._service.postEdit(this._itemEdit);
            this._router.navigate([this._listUrl]);
        }
        catch (e) {
            this._error = e.error;
        }
    }
}