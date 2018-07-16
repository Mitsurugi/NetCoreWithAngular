import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';
import { tick } from '@angular/core/src/render3';

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

    constructor(service: CoreService<TGrid, TCreate, TEdit, TFilter>, typeGrid: (new () => TGrid), typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), typeFilter: (new () => TFilter))
    {
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

    ngOnInit() {
        this.refreshPage();
        this._service.getFilter().subscribe((data: TFilter) => this.filter = data, (e) => { this.error = JSON.stringify(e.error); });
    }

    refreshPage() {
        this.error = null;
        this._service.getPagesCount(this.pageSize, this.filter).subscribe((data: number) => this.totalPages = data, (e) => { this.error = JSON.stringify(e.error); });
        this._service.getGrid(this.currentPage, this.pageSize, this.filter).subscribe((data: TGrid[]) => this.items = data, (e) => { this.error = JSON.stringify(e.error); });
        this.isShowEdit = new Array<boolean>();
        for (let i = 0; i < this.items.length; i++) {
            this.isShowEdit.push(false);
        }
    }

    clearFilter() {
        this.filter = new this.typeFilter();
        this._service.getFilter().subscribe((data: TFilter) => this.filter = data, (e) => { this.error = JSON.stringify(e.error); });
        this.refreshPage();
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.refreshPage();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.refreshPage();
        }
    }

    toggleCreate() {
        if (this.isShowCreate) {
            this.isShowCreate = false;
        }
        else {
            this.getCreate();
            this.isShowCreate = true;
        }
    }

    toggleEdit(index: number, id: number) {
        if (this.isShowEdit[index]) {
            this.isShowEdit[index] = false;
        }
        else {
            this.getEdit(id);
            this.isShowEdit[index] = true;
        }
    }    

    getCreate() {
        this.error = null;
        this._service.getCreate().subscribe((data: TCreate) => this.itemCreate = data, (e) => { this.error = JSON.stringify(e.error); });
    }

    getEdit(id: number) {
        this.error = null;
        this._service.getEdit(id).subscribe((data: TEdit) => this.itemEdit = data, (e) => { this.error = JSON.stringify(e.error); });
    }

    delete(id: number) {
        this.error = null;
        this._service.delete(id).subscribe((data) => { this.refreshPage(); }, (e) => { this.error = JSON.stringify(e.error); });        
    }

    postCreate() {
        this.error = null;
        this._service.postCreate(this.itemCreate).subscribe((data: TCreate) => { this.getCreate(); this.isShowCreate = false; this.refreshPage(); }, (e) => { this.error = JSON.stringify(e.error); });
    }

    postEdit() {
        this.error = null;
        this._service.postEdit(this.itemEdit).subscribe((data: TEdit) => { this.itemEdit = data; this.refreshPage(); }, (e) => { this.error = JSON.stringify(e.error); });
    }
}