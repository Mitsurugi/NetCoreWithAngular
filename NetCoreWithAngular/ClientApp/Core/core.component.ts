import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';
import { tick } from '@angular/core/src/render3';

@Component({
})
export class CoreComponent<TGrid, TEdit, TCreate> implements OnInit {

    _service: CoreService<TGrid, TEdit, TCreate>;

    items: TGrid[];
    itemEdit: TEdit;
    itemCreate: TCreate;
    currentPage: number = 1;
    pageSize: number = 5;
    pageCount: number = 1;
    error: string = null;

    constructor(service: CoreService<TGrid, TEdit, TCreate>, typeGrid: (new () => TGrid), typeEdit: (new () => TEdit), typeCreate: (new () => TCreate))
    {
        this._service = service;
        this.items = new Array<TGrid>();
        this.itemEdit = new typeEdit();
        this.itemCreate = new typeCreate();
    }
    refreshPage() {
        this.error = null;
        this._service.getPagesCount(this.pageSize).subscribe((data: number) => this.pageCount = data, (e) => { this.error = JSON.stringify(e.error); });
        this._service.getGrid(this.currentPage, this.pageSize).subscribe((data: TGrid[]) => this.items = data, (e) => { this.error = JSON.stringify(e.error); });
    }

    ngOnInit() {
        this.refreshPage();
    }

    nextPage() {
        if (this.currentPage < this.pageCount) {
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
        this._service.postCreate(this.itemCreate).subscribe((data: TCreate) => { this.getCreate(); this.refreshPage(); }, (e) => { this.error = JSON.stringify(e.error); });
    }

    postEdit() {
        this.error = null;
        this._service.postEdit(this.itemEdit).subscribe((data: TEdit) => { this.itemEdit = data; this.refreshPage(); }, (e) => { this.error = JSON.stringify(e.error); });
    }
}