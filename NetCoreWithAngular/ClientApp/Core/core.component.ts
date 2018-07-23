import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';

@Component({
})
export class CoreComponent<TGrid, TCreate, TEdit, TFilter> implements OnInit {

    _service: CoreService<TGrid, TCreate, TEdit, TFilter>;

    _items: TGrid[];
    _itemEdit: TEdit;
    _itemCreate: TCreate;
    _filter: TFilter;
    _currentPage: number = 1;
    _pageSize: number = 5;
    _totalPages: number = 1;
    _error: string = null;
    _isShowCreate = false;
    _isShowEdit: boolean[] = new Array<boolean>();

    typeGrid: (new () => TGrid);
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);
    typeFilter: (new () => TFilter);

    constructor(service: CoreService<TGrid, TCreate, TEdit, TFilter>, typeGrid: (new () => TGrid), typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), typeFilter: (new () => TFilter)) {
        this._service = service;
        this._items = new Array<TGrid>();
        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this._filter = new typeFilter();

        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;
    }

    async ngOnInit() {
        try {
            this._filter = await this._service.getFilter();
            await this.refreshPage();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async refreshPage() {
        this._error = null;
        try {
            this._totalPages = await this._service.getPagesCount(this._pageSize, this._filter);
            this._items = await this._service.getGrid(this._currentPage, this._pageSize, this._filter);
            this._isShowEdit = new Array<boolean>();
            for (let i = 0; i < this._items.length; i++) {
                this._isShowEdit.push(false);
            }
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async clearFilter() {
        this._filter = new this.typeFilter();
        try {
            this._filter = await this._service.getFilter();
            await this.refreshPage();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async nextPage() {
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                await this.refreshPage();
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    async prevPage() {
        if (this._currentPage > 1) {
            this._currentPage--;
            try {
                await this.refreshPage();
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    async toggleCreate() {
        if (this._isShowCreate) {
            this._isShowCreate = false;
        }
        else {
            try {
                await this.getCreate();
                this._isShowCreate = true;
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    async toggleEdit(index: number, id: number) {
        if (this._isShowEdit[index]) {
            this._isShowEdit[index] = false;
        }
        else {
            try {
                await this.getEdit(id);
                this._isShowEdit[index] = true;
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    async getCreate() {
        this._error = null;
        try {
            this._itemCreate = await this._service.getCreate();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async getEdit(id: number) {
        this._error = null;
        try {
            this._itemEdit = await this._service.getEdit(id);
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async delete(id: number) {
        this._error = null;
        try {
            await this._service.delete(id);
            await this.refreshPage();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async postCreate() {
        this._error = null;
        try {
            await this._service.postCreate(this._itemCreate);
            this._isShowCreate = false;
            await this.getCreate();
            await this.refreshPage();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async postEdit() {
        this._error = null;
        try {
            this._itemEdit = await this._service.postEdit(this._itemEdit);
            await this.refreshPage();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }
}