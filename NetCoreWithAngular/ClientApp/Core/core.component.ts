import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';

@Component({
})
export class CoreComponent<TGrid, TCreate, TEdit, TFilter> implements OnInit {

    _service: CoreService<TGrid, TCreate, TEdit, TFilter>;

    items: TGrid[];
    itemEdit: TEdit;
    itemCreate: TCreate;
    filter: TFilter;
    currentPage: number = 1;
    pageSize: number = 5;
    totalPages: number = 1;
    error: string = null;
    isShowCreate = false;
    isShowEdit: boolean[] = new Array<boolean>();

    typeGrid: (new () => TGrid);
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);
    typeFilter: (new () => TFilter);

    constructor(service: CoreService<TGrid, TCreate, TEdit, TFilter>, typeGrid: (new () => TGrid), typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), typeFilter: (new () => TFilter)) {
        this._service = service;
        this.items = new Array<TGrid>();
        this.itemEdit = new typeEdit();
        this.itemCreate = new typeCreate();
        this.filter = new typeFilter();

        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;
    }

    async ngOnInit() {
        try {
            this.filter = await this._service.getFilter();
            await this.refreshPage();
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async refreshPage() {
        this.error = null;
        try {
            this.totalPages = await this._service.getPagesCount(this.pageSize, this.filter);
            this.items = await this._service.getGrid(this.currentPage, this.pageSize, this.filter);
            this.isShowEdit = new Array<boolean>();
            for (let i = 0; i < this.items.length; i++) {
                this.isShowEdit.push(false);
            }
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async clearFilter() {
        this.filter = new this.typeFilter();
        try {
            this.filter = await this._service.getFilter();
            await this.refreshPage();
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            try {
                await this.refreshPage();
            }
            catch (e) {
                this.error = JSON.stringify(e.error);
            }
        }
    }

    async prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            try {
                await this.refreshPage();
            }
            catch (e) {
                this.error = JSON.stringify(e.error);
            }
        }
    }

    async toggleCreate() {
        if (this.isShowCreate) {
            this.isShowCreate = false;
        }
        else {
            try {
                await this.getCreate();
                this.isShowCreate = true;
            }
            catch (e) {
                this.error = JSON.stringify(e.error);
            }
        }
    }

    async toggleEdit(index: number, id: number) {
        if (this.isShowEdit[index]) {
            this.isShowEdit[index] = false;
        }
        else {
            try {
                await this.getEdit(id);
                this.isShowEdit[index] = true;
            }
            catch (e) {
                this.error = JSON.stringify(e.error);
            }
        }
    }

    async getCreate() {
        this.error = null;
        try {
            this.itemCreate = await this._service.getCreate();
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async getEdit(id: number) {
        this.error = null;
        try {
            this.itemEdit = await this._service.getEdit(id);
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async delete(id: number) {
        this.error = null;
        try {
            await this._service.delete(id);
            await this.refreshPage();
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async postCreate() {
        this.error = null;
        try {
            await this._service.postCreate(this.itemCreate);
            this.isShowCreate = false;
            await this.getCreate();
            await this.refreshPage();
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }

    async postEdit() {
        this.error = null;
        try {
            this.itemEdit = await this._service.postEdit(this.itemEdit);
            await this.refreshPage();
        }
        catch (e) {
            this.error = JSON.stringify(e.error);
        }
    }
}