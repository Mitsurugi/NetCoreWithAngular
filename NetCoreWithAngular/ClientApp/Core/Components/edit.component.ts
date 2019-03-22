import { Component, OnInit, Input } from '@angular/core';
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

    @Input() _id?: TKey;
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

    protected async getCreateModelAsync() {
        this._message = null;
        try {
            this._itemCreate = await this._service.getCreateModelAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    protected async getEditModelAsync() {
        this._message = null;
        try {
            this._itemEdit = await this._service.getEditModelAsync(this._id);
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async ngOnInit() {
        this._message = null;
        try {
            if (this._id) {
                this.getEditModelAsync();
            } else {
                this.getCreateModelAsync();
            }
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }    

    public async saveCreateModelAsync() {
        this._message = null;
        try {
            var result = await this._service.saveCreateModelAsync(this._itemCreate);
            await this.getCreateModelAsync();
            this._router.navigate([this._listUrl + 'edit/' + result.id]);
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async saveEditModelAsync() {
        this._message = null;
        try {
            this._itemEdit = await this._service.saveEditModelAsync(this._itemEdit);
            this._message = "Изменения успешно сохранены";
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }
}