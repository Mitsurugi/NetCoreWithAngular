﻿import { Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
})
export class CoreComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey>, TEdit extends IEntity<TKey>, TFilter> implements OnInit {

    _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;

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
    _importFile: File = null;
    _importResult: string;
    _isShowImport: boolean;
    _orderBy: string = 'Id_desc';

    typeGrid: (new () => TGrid);
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);
    typeFilter: (new () => TFilter);

    constructor(service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>, typeGrid: (new () => TGrid), typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), typeFilter: (new () => TFilter)) {
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

    public async ngOnInit() {
        try {
            this._filter = await this._service.getFilter();
            await this.reloadGrid();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async reloadGrid() {
        this._error = null;
        try {
            this._totalPages = await this._service.getPagesCount(this._pageSize, this._filter);
            this._items = await this._service.getGrid(this._currentPage, this._pageSize, this._orderBy, this._filter);
            this._isShowEdit = new Array<boolean>();
            for (let i = 0; i < this._items.length; i++) {
                this._isShowEdit.push(false);
            }
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async clearFilter() {
        this._filter = new this.typeFilter();
        try {
            this._filter = await this._service.getFilter();
            await this.reloadGrid();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async nextPage() {
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                await this.reloadGrid();
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    public async prevPage() {
        if (this._currentPage > 1) {
            this._currentPage--;
            try {
                await this.reloadGrid();
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    public async toggleCreate() {
        if (this._isShowCreate) {
            this._isShowCreate = false;
        }
        else {
            try {
                await this.getCreate();
                this._isShowCreate = true;
                this._isShowImport = false;
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    public async toggleImport() {
        if (this._isShowImport) {
            this._isShowImport = false;
        }
        else {
            try {
                this._isShowImport = true;
                this._isShowCreate = false;
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }

    public async toggleEdit(index: number, id: number) {
        if (this._isShowEdit[index]) {
            this._isShowEdit[index] = false;
        }
        else {
            try {
                await this.getEdit(id);
                for (let i = 0; i < this._isShowEdit.length; i++) {
                    this._isShowEdit[i] = false;
                }
                this._isShowEdit[index] = true;
            }
            catch (e) {
                this._error = JSON.stringify(e.error);
            }
        }
    }
    
    private async getCreate() {
        this._error = null;
        try {
            this._itemCreate = await this._service.getCreate();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    private async getEdit(id: number) {
        this._error = null;
        try {
            this._itemEdit = await this._service.getEdit(id);
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async delete(id: number) {
        this._error = null;
        try {
            await this._service.delete(id);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async postCreate() {
        this._error = null;
        try {
            await this._service.postCreate(this._itemCreate);
            this._isShowCreate = false;
            await this.getCreate();
            await this.reloadGrid();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async postEdit() {
        this._error = null;
        try {
            this._itemEdit = await this._service.postEdit(this._itemEdit);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async excelExport() {
        this._error = null;
        try {
            let b = await this._service.getExcelExport(this._orderBy, this._filter);
            saveAs(b, "ExcelExport.xlsx");
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async importTemplate() {
        this._error = null;
        try {
            let b = await this._service.getImportTemplate();
            saveAs(b, "ImportTemplate.xlsx");
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    public async postImport() {
        if (this._importFile == null) {
            this._importResult = "Import file not selected";
        }
        else {
            try {
                await this._service.postImport(this._importFile);
                await this.reloadGrid();
                this._importResult = "Import successful";
            }
            catch (e) {
                this._importResult = JSON.stringify(e.error.Message);
            }
        }        
    }

    public setImportFile(file: File) {
        this._importFile = file;
    }
}