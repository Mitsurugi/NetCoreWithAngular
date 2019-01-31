import { Component, OnInit } from '@angular/core';
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
            this._error = e.error.Message;
        }
    }

    public async reloadGrid() {
        this._error = null;
        try {
            this._showEditId = null;
            this._totalPages = await this._service.getPagesCount(this._pageSize, this._filter);
            this._items = await this._service.getGrid(this._currentPage, this._pageSize, this._orderBy, this._filter);
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    public async clearFilter() {
        this._filter = new this.typeFilter();
        try {
            this._filter = await this._service.getFilter();
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    public async nextPage() {
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                await this.reloadGrid();
            }
            catch (e) {
                this._error = e.error.Message;
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
                this._error = e.error.Message;
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
                this._error = e.error.Message;
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
                this._error = e.error.Message;
            }
        }
    }

    public async toggleEdit(id: TKey) {
        if (this._showEditId == id) {
            this._showEditId = null;
        }
        else {
            try {
                await this.getEdit(id);
                this._showEditId = id;
            }
            catch (e) {
                this._error = e.error.Message;
            }
        }
    }

    private async getCreate() {
        this._error = null;
        try {
            this._itemCreate = await this._service.getCreate();
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    private async getEdit(id: TKey) {
        this._error = null;
        try {
            this._itemEdit = await this._service.getEdit(id);
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    public async delete(id: TKey) {
        this._error = null;
        try {
            await this._service.delete(id);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    public async deleteChecked() {
        this._error = null;
        try {
            await this._service.deleteMany(this._checkedItems);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error.Message;
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
            this._error = e.error.Message;
        }
    }

    public async postEdit() {
        this._error = null;
        try {
            this._itemEdit = await this._service.postEdit(this._itemEdit);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    public async excelExport() {
        this._error = null;
        try {
            let b = await this._service.getExcelExport(this._orderBy, this._filter);
            saveAs(b, "ExcelExport.xlsx");
        }
        catch (e) {
            this._error = e.error.Message;
        }
    }

    public async importTemplate() {
        this._error = null;
        try {
            let b = await this._service.getImportTemplate();
            saveAs(b, "ImportTemplate.xlsx");
        }
        catch (e) {
            this._error = e.error.Message;
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