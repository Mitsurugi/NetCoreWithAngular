import { Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
})
export class EditComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey> = TGrid, TEdit extends IEntity<TKey> = TGrid, TFilter = TGrid> implements OnInit {    

    _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;
    _router: Router;
    _listUrl: string;

    _id?: TKey;
    _itemEdit: TEdit;
    _itemCreate: TCreate;
    _message: string = null;
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

    protected async getCreateAsync() {
        this._message = null;
        try {
            this._itemCreate = await this._service.getCreateAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    protected async getEditAsync() {
        this._message = null;
        try {
            this._itemEdit = await this._service.getEditAsync(this._id);
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async ngOnInit() {
        this._message = null;
        try {
            if (this._id) {
                this.getEditAsync();
            } else {
                this.getCreateAsync();
            }
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }    

    public async postCreateAsync() {
        this._message = null;
        try {
            var result = await this._service.postCreateAsync(this._itemCreate);
            await this.getCreateAsync();
            this._router.navigate([this._listUrl + 'edit/' + result.id]);
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async postEditAsync() {
        this._message = null;
        try {
            this._itemEdit = await this._service.postEditAsync(this._itemEdit);
            this._message = "Изменения успешно сохранены";
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }
}