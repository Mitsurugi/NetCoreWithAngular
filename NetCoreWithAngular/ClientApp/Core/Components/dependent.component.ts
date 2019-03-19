﻿import { Input, Component, OnInit } from '@angular/core';
import { DependentService } from '../Services/dependent.service';
import { IDependentEntity } from '../Models/IDependentEntity';
import { ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';

@Component({
})
export class DependentComponent<TKey, TParentKey, TParentView, TGrid extends IDependentEntity<TKey, TParentKey>, TCreate extends IDependentEntity<TKey, TParentKey> = TGrid, TEdit extends IDependentEntity<TKey, TParentKey> = TGrid, TFilter = TGrid> implements OnInit {

    _service: DependentService<TKey, TParentKey, TParentView, TGrid, TCreate, TEdit, TFilter>;

    @Input() _parentId: TParentKey;

    _parent: TParentView;
    _items: TGrid[];
    _itemEdit: TEdit;
    _itemCreate: TCreate;
    _filter: TFilter;
    _currentPage: number = 1;
    _pageSize: number = 20;
    _totalPages: number = 1;
    _message: string = null;
    _isShowCreate = false;
    _showEditId?: TKey = null;
    _checkedItems: TKey[] = [];
    _checkAllChecked: boolean[] = [];
    _importFile: File = null;
    _importResult: string;
    _isShowImport: boolean;
    _orderBy: string = 'Id_desc';

    typeGrid: (new () => TGrid);
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);
    typeFilter: (new () => TFilter);

    constructor(service: DependentService<TKey, TParentKey, TParentView, TGrid, TCreate, TEdit, TFilter>, typeGrid: (new () => TGrid), typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), typeFilter: (new () => TFilter), route: ActivatedRoute) {
        this._service = service;
        this._items = new Array<TGrid>();
        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this._filter = new typeFilter();

        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;

        if (!this._parentId) {
            route.params.subscribe(params => this._parentId = params['parentId']);
        }        
    }

    protected async getCreateAsync() {
        this._message = null;
        try {
            this._itemCreate = await this._service.getCreateAsync(this._parentId);
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    protected async getEditAsync(id: TKey) {
        this._message = null;
        try {
            this._itemEdit = await this._service.getEditAsync(id);
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async ngOnInit() {
        try {
            this._filter = await this._service.getFilterAsync();
            this._parent = await this._service.getParentAsync(this._parentId);
            await this.reloadGridAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async reloadGridAsync() {
        this._message = null;
        try {
            this._showEditId = null;
            this._totalPages = await this._service.getPagesCountAsync(this._pageSize, this._parentId, this._filter);
            this._items = await this._service.getGridAsync(this._parentId, this._currentPage, this._pageSize, this._orderBy, this._filter);    
            await this.getCreateAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async clearFilterAsync() {
        this._filter = new this.typeFilter();
        try {
            this._filter = await this._service.getFilterAsync();
            await this.reloadGridAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async nextPageAsync() {
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                await this.reloadGridAsync();
            }
            catch (e) {
                this._message = "Ошибка: " + e.error;
            }
        }
    }

    public async prevPageAsync() {
        if (this._currentPage > 1) {
            this._currentPage--;
            try {
                await this.reloadGridAsync();
            }
            catch (e) {
                this._message = "Ошибка: " + e.error;
            }
        }
    }

    public async toggleCreateAsync() {
        if (this._isShowCreate) {
            this._isShowCreate = false;
        }
        else {
            try {
                await this.getCreateAsync();
                this._isShowCreate = true;
                this._isShowImport = false;
            }
            catch (e) {
                this._message = "Ошибка: " + e.error;
            }
        }
    }

    public toggleImport() {
        if (this._isShowImport) {
            this._isShowImport = false;
        }
        else {
            try {
                this._isShowImport = true;
                this._isShowCreate = false;
            }
            catch (e) {
                this._message = "Ошибка: " + e.error;
            }
        }
    }

    public async toggleEditAsync(id: TKey) {
        if (this._showEditId == id) {
            this._showEditId = null;
        }
        else {
            try {
                await this.getEditAsync(id);
                this._showEditId = id;
            }
            catch (e) {
                this._message = "Ошибка: " + e.error;
            }
        }
    }

    

    public async deleteAsync(id: TKey) {
        this._message = null;
        try {
            await this._service.deleteAsync(id);
            await this.reloadGridAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async deleteCheckedAsync() {
        this._message = null;
        try {
            await this._service.deleteManyAsync(this._checkedItems);
            await this.reloadGridAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async postCreateAsync() {
        this._message = null;
        try {
            await this._service.postCreateAsync(this._itemCreate);
            this._isShowCreate = false;
            await this.getCreateAsync();
            await this.reloadGridAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async postEditAsync() {
        this._message = null;
        try {
            this._itemEdit = await this._service.postEditAsync(this._itemEdit);
            await this.reloadGridAsync();
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async getExcelExportAsync() {
        this._message = null;
        try {
            let b = await this._service.getExcelExportAsync(this._parentId, this._orderBy, this._filter);
            saveAs(b, "ExcelExport.xlsx");
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async getImportTemplateAsync() {
        this._message = null;
        try {
            let b = await this._service.getImportTemplateAsync();
            saveAs(b, "ImportTemplate.xlsx");
        }
        catch (e) {
            this._message = "Ошибка: " + e.error;
        }
    }

    public async postImportAsync() {
        if (this._importFile == null) {
            this._importResult = "Файл импорта не выбран";
        }
        else {
            try {
                await this._service.postImportAsync(this._parentId, this._importFile);
                await this.reloadGridAsync();
                this._importResult = "Импорт прошел успешно";
            }
            catch (e) {
                this._importResult = JSON.stringify("Ошибка: " + e.error);
            }
        }        
    }

    public setImportFile(file: File) {
        this._importFile = file;
    }

    public toggleChecked(id: TKey) {
        var index = this._checkedItems.indexOf(id);
        if (index < 0) { this._checkedItems.push(id); }
        else {
            this._checkedItems = this._checkedItems.slice(0, index).concat(this._checkedItems.slice(index + 1, this._checkedItems.length));
        }
    }

    public toggleCheckAll() {
        let checked = true;
        this._items.forEach(i => {
            var index = this._checkedItems.indexOf(i.id);
            if (index < 0) checked = false;
        });

        if (checked) {
            this._items.forEach(i => {
                var index = this._checkedItems.indexOf(i.id);
                this._checkedItems = this._checkedItems.slice(0, index).concat(this._checkedItems.slice(index + 1, this._checkedItems.length));
            });
        } else {
            this._items.forEach(i => {
                var index = this._checkedItems.indexOf(i.id);
                if (index < 0) { this._checkedItems.push(i.id); }
            });
        }
    }
}