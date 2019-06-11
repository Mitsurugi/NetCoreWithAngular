﻿import { Component, OnInit } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { IEntity } from '../Models/IEntity'
import { saveAs } from 'file-saver';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';

@Component({
})
export class CoreComponent<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey> = TGrid, TEdit extends IEntity<TKey> = TGrid, TFilter = TGrid> implements OnInit {

    _service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>;
    _localizer: CoreLocalizerService;

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
    _importFile: File = null;
    _importResult: string;
    _isShowImport: boolean;
    _orderBy: string = '';

    typeGrid: (new () => TGrid);
    typeCreate: (new () => TCreate);
    typeEdit: (new () => TEdit);
    typeFilter: (new () => TFilter);

    constructor(service: CoreService<TKey, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, typeGrid: (new () => TGrid), typeCreate: (new () => TCreate), typeEdit: (new () => TEdit), typeFilter: (new () => TFilter)) {
        this._service = service;
        this._localizer = localizer;

        this._items = new Array<TGrid>();
        this._itemEdit = new typeEdit();
        this._itemCreate = new typeCreate();
        this._filter = new typeFilter();

        this.typeGrid = typeGrid;
        this.typeCreate = typeCreate;
        this.typeEdit = typeEdit;
        this.typeFilter = typeFilter;
    }

    protected async getCreateModelAsync() {        
        try {
            this._message = this._localizer.localize("Loading");
            this._itemCreate = await this._service.getCreateModelAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    protected async getEditModelAsync(id: TKey) {        
        try {
            this._message = this._localizer.localize("Loading");
            this._itemEdit = await this._service.getEditModelAsync(id);
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async ngOnInit() {
        try {
            this._message = this._localizer.localize("Loading");
            this._filter = await this._service.getFilterModelAsync();
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async reloadGridAsync() {        
        try {
            this._message = this._localizer.localize("Loading");
            this._showEditId = null;
            this._totalPages = await this._service.getPagesCountAsync(this._pageSize, this._filter);
            this._items = await this._service.getGridAsync(this._currentPage, this._pageSize, this._orderBy, this._filter);
            await this.getCreateModelAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async clearFilterAsync() {
        this._filter = new this.typeFilter();        
        try {
            this._message = this._localizer.localize("Loading");
            this._filter = await this._service.getFilterModelAsync();
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async nextPageAsync() {        
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                this._message = this._localizer.localize("Loading");
                await this.reloadGridAsync();
                this._message = null;
            }
            catch (e) {
                this._message = this._localizer.localizeWithValues("Error", e.error);
            }
        }
    }

    public async prevPageAsync() {        
        if (this._currentPage > 1) {
            this._currentPage--;
            try {
                this._message = this._localizer.localize("Loading");
                await this.reloadGridAsync();
                this._message = null;
            }
            catch (e) {
                this._message = this._localizer.localizeWithValues("Error", e.error);
            }
        }
    }

    public async toggleCreateAsync() {
        if (this._isShowCreate) {
            this._isShowCreate = false;
        }
        else {
            try {
                this._message = this._localizer.localize("Loading");
                await this.getCreateModelAsync();
                this._isShowCreate = true;
                this._isShowImport = false;
                this._message = null;
            }
            catch (e) {
                this._message = this._localizer.localizeWithValues("Error", e.error);
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
                this._message = this._localizer.localizeWithValues("Error", e.error);
            }
        }
    }

    public async toggleEditAsync(id: TKey) {
        if (this._showEditId == id) {
            this._showEditId = null;
        }
        else {
            try {
                this._message = this._localizer.localize("Loading");
                await this.getEditModelAsync(id);
                this._showEditId = id;
                this._message = null;
            }
            catch (e) {
                this._message = this._localizer.localizeWithValues("Error", e.error);
            }
        }
    }    

    public async deleteAsync(id: TKey) {
        try {
            this._message = this._localizer.localize("Loading");
            await this._service.deleteAsync(id);
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async deleteCheckedAsync() {
        try {
            this._message = this._localizer.localize("Loading");
            await this._service.deleteManyAsync(this._checkedItems);
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async saveCreateModelAsync() {
        try {
            this._message = this._localizer.localize("Loading");
            await this._service.saveCreateModelAsync(this._itemCreate);
            this._isShowCreate = false;
            await this.getCreateModelAsync();
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async saveEditModelAsync() {     
        try {
            this._message = this._localizer.localize("Loading");
            this._itemEdit = await this._service.saveEditModelAsync(this._itemEdit);
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async getExcelExportAsync() {
        try {
            this._message = this._localizer.localize("Loading");
            let b = await this._service.getExcelExportAsync(this._orderBy, this._filter);
            this._message = null;
            saveAs(b, "ExcelExport.xlsx");
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async getImportTemplateAsync() {                    
        try {
            this._message = this._localizer.localize("Loading");
            let b = await this._service.getImportTemplateAsync();
            this._message = null;
            saveAs(b, "ImportTemplate.xlsx");
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }

    public async importAsync() {
        if (this._importFile == null) {
            this._importResult = this._localizer.localize("ImportFileNull");
        }
        else {
            try {
                this._importResult = this._localizer.localize("Loading");       
                await this._service.importAsync(this._importFile);
                await this.reloadGridAsync();
                this._importResult = this._localizer.localize("ImportSuccess");
            }
            catch (e) {
                this._importResult = JSON.stringify(this._localizer.localizeWithValues("Error", e.error));
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