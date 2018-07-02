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

    constructor(service: CoreService<TGrid, TEdit, TCreate>, typeGrid: (new () => TGrid), typeEdit: (new () => TEdit), typeCreate: (new () => TCreate))
    {
        this._service = service;
        this.items = new Array<TGrid>();
        this.itemEdit = new typeEdit();
        this.itemCreate = new typeCreate();
    }
    refreshPage() {
        this._service.getPagesCount(this.pageSize).subscribe((data: number) => this.pageCount = data);
        this._service.getGrid(this.currentPage, this.pageSize).subscribe((data: TGrid[]) => this.items = data);
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
        this._service.getCreate().subscribe((data: TCreate) => this.itemCreate = data);
    }

    getEdit(id: number) {
        this._service.getEdit(id).subscribe((data: TEdit) => this.itemEdit = data);
    }

    delete(id: number) {
        this._service.delete(id).subscribe((data) => { this.refreshPage(); });        
    }

    postCreate() {
        this._service.postCreate(this.itemCreate).subscribe((data: TCreate) => { this.getCreate(); this.refreshPage(); });
    }

    postEdit() {
        this._service.postEdit(this.itemEdit).subscribe((data: TEdit) => { this.itemEdit = data; this.refreshPage(); });
    }
}