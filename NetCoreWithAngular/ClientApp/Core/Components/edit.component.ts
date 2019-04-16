import { Input, Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from "@angular/router";
import { CoreLocalizerService } from '../Localization/localizer.service';

@Component({
})
export class EditComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey> = TGrid, TEdit extends IEntity<TKey> = TGrid, TFilter = TGrid> implements OnInit {    

    _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;
    _router: Router;
    _listUrl: string;
    _localizer: CoreLocalizerService;

    @Input() _id?: TKey;

    _itemEdit: TEdit;
    _itemCreate: TCreate;
    _message: string = null;
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);

    constructor(service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), route: ActivatedRoute, router: Router, listUrl: string) {

        this._listUrl = listUrl;

        this._service = service;
        this._router = router;
        this._localizer = localizer;

        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        if (!this._id) {
            route.params.subscribe(params => this._id = params['id']);
        }
        
    }

    protected async getCreateModelAsync() {
        this._message = this._localizer.localize("Loading");
        try {
            this._itemCreate = await this._service.getCreateModelAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    protected async getEditModelAsync() {
        this._message = this._localizer.localize("Loading");
        try {
            this._itemEdit = await this._service.getEditModelAsync(this._id);
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async ngOnInit() {
        this._message = this._localizer.localize("Loading");
        try {
            if (this._id) {
                this.getEditModelAsync();
            } else {
                this.getCreateModelAsync();
            }
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }    

    public async saveCreateModelAsync() {
        this._message = this._localizer.localize("Loading");        
        try {
            var result = await this._service.saveCreateModelAsync(this._itemCreate);
            await this.getCreateModelAsync();
            this._message = null;
            this._router.navigate([this._listUrl + '/edit/' + result.id]);            
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async saveEditModelAsync() {
        this._message = this._localizer.localize("Loading");
        try {
            this._itemEdit = await this._service.saveEditModelAsync(this._itemEdit);
            this._message = this._localizer.localize("EditSuccess");
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }
}