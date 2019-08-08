﻿import { Input, Component, OnInit } from '@angular/core';
import { DependentService } from '../Services/dependent.service';
import { IDependentEntity } from '../Models/IDependentEntity';
import { ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
})
export class DependentComponent<TKey, TParentKey, TParentView, TGrid extends IDependentEntity<TKey, TParentKey>, TCreate extends IDependentEntity<TKey, TParentKey> = TGrid, TEdit extends IDependentEntity<TKey, TParentKey> = TGrid, TFilter = TGrid> implements OnInit {

    _service: DependentService<TKey, TParentKey, TParentView, TGrid, TCreate, TEdit, TFilter>;
    _localizer: CoreLocalizerService;
    _snackBar: MatSnackBar;

    @Input() _parentId: TParentKey;

    _parent: TParentView;
    _items: TGrid[];
    _itemEdit: TEdit;
    _itemCreate: TCreate;
    _filter: TFilter;
    _currentPage: number = 1;
    _pageSize: number = 20;
    _totalPages: number = 1;
    _isShowCreate = false;
    _showEditId?: TKey = null;
    _checkedItems: TKey[] = [];
    _checkAllChecked: boolean[] = [];
    _importFile: File = null;
    _isShowImport: boolean;
    _orderBy: string = 'Id_desc';


    constructor(service: DependentService<TKey, TParentKey, TParentView, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, snackBar: MatSnackBar, route: ActivatedRoute) {
        this._service = service;
        this._localizer = localizer;
        this._snackBar = snackBar;

        if (!this._parentId) {
            route.params.subscribe(params => this._parentId = params['parentId']);
        }        
    }

    protected async getCreateModelAsync() {        
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._itemCreate = await this._service.getCreateModelAsync(this._parentId);
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    protected async getEditModelAsync(id: TKey) {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._itemEdit = await this._service.getEditModelAsync(id, this._parentId);
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async ngOnInit() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._filter = await this._service.getFilterModelAsync(this._parentId);
            this._parent = await this._service.getParentAsync(this._parentId);
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async reloadGridAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._showEditId = null;
            this._totalPages = await this._service.getPagesCountAsync(this._pageSize, this._parentId, this._filter);
            if (this._currentPage < 1) this._currentPage = 1;
            if (this._currentPage > this._totalPages) this._currentPage = this._totalPages;
            this._items = await this._service.getGridAsync(this._parentId, this._currentPage, this._pageSize, this._orderBy, this._filter);    
            await this.getCreateModelAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async clearFilterAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._filter = await this._service.getFilterModelAsync(this._parentId);
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async nextPageAsync() {
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this.reloadGridAsync();
                popup.dismiss();
            }
            catch (e) {
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        }
    }

    public async prevPageAsync() {
        if (this._currentPage > 1) {
            this._currentPage--;
            try {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this.reloadGridAsync();
                popup.dismiss();
            }
            catch (e) {
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        }
    }

    public async toggleCreateAsync() {
        if (this._isShowCreate) {
            this._isShowCreate = false;
        }
        else {
            try {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this.getCreateModelAsync();
                this._isShowCreate = true;
                this._isShowImport = false;
                popup.dismiss();
            }
            catch (e) {
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
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
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        }
    }

    public async toggleEditAsync(id: TKey) {
        if (this._showEditId == id) {
            this._showEditId = null;
        }
        else {
            try {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this.getEditModelAsync(id);
                this._showEditId = id;
                popup.dismiss();
            }
            catch (e) {
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        }
    }

    

    public async deleteAsync(id: TKey) {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this._service.deleteAsync(id, this._parentId);
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async deleteCheckedAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this._service.deleteManyAsync(this._checkedItems, this._parentId);
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async saveCreateModelAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this._service.saveCreateModelAsync(this._itemCreate, this._parentId);
            this._isShowCreate = false;
            await this.getCreateModelAsync();
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async saveEditModelAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._itemEdit = await this._service.saveEditModelAsync(this._itemEdit, this._parentId);
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async getExcelExportAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            let b = await this._service.getExcelExportAsync(this._parentId, this._orderBy, this._filter);
            popup.dismiss();
            saveAs(b, "ExcelExport.xlsx");
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async getImportTemplateAsync() {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            let b = await this._service.getImportTemplateAsync(this._parentId);
            popup.dismiss();
            saveAs(b, "ImportTemplate.xlsx");
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    public async importAsync() {
        if (this._importFile == null) {
            var popup = this._snackBar.open(this._localizer.localize("ImportFileNull"), null, { duration: 5000 });
        }
        else {
            try {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this._service.importAsync(this._parentId, this._importFile);
                await this.reloadGridAsync();
                var popup = this._snackBar.open(this._localizer.localize("ImportSuccess"), null, { duration: 5000 });
            }
            catch (e) {
                popup.dismiss();
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", JSON.stringify(e.error)));
                }
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