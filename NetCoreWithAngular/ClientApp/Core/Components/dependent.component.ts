import { Input, Component, OnInit } from '@angular/core';
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
    _error: string = null;
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

    public async ngOnInit() {
        try {
            this._filter = await this._service.getFilter();
            this._parent = await this._service.getParent(this._parentId);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async reloadGrid() {
        this._error = null;
        try {
            this._showEditId = null;
            this._totalPages = await this._service.getPagesCount(this._pageSize, this._parentId, this._filter);
            this._items = await this._service.getGrid(this._parentId, this._currentPage, this._pageSize, this._orderBy, this._filter);    
            await this.getCreate();
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async clearFilter() {
        this._filter = new this.typeFilter();
        try {
            this._filter = await this._service.getFilter();
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async nextPage() {
        if (this._currentPage < this._totalPages) {
            this._currentPage++;
            try {
                await this.reloadGrid();
            }
            catch (e) {
                this._error = e.error;
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
                this._error = e.error;
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
                this._error = e.error;
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
                this._error = e.error;
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
                this._error = e.error;
            }
        }
    }

    protected async getCreate() {
        this._error = null;
        try {
            this._itemCreate = await this._service.getCreate(this._parentId);
        }
        catch (e) {
            this._error = e.error;
        }
    }

    protected async getEdit(id: TKey) {
        this._error = null;
        try {
            this._itemEdit = await this._service.getEdit(id);
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async delete(id: TKey) {
        this._error = null;
        try {
            await this._service.delete(id);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async deleteChecked() {
        this._error = null;
        try {
            await this._service.deleteMany(this._checkedItems);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error;
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
            this._error = e.error;
        }
    }

    public async postEdit() {
        this._error = null;
        try {
            this._itemEdit = await this._service.postEdit(this._itemEdit);
            await this.reloadGrid();
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async excelExport() {
        this._error = null;
        try {
            let b = await this._service.getExcelExport(this._parentId, this._orderBy, this._filter);
            saveAs(b, "ExcelExport.xlsx");
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async importTemplate() {
        this._error = null;
        try {
            let b = await this._service.getImportTemplate();
            saveAs(b, "ImportTemplate.xlsx");
        }
        catch (e) {
            this._error = e.error;
        }
    }

    public async postImport() {
        if (this._importFile == null) {
            this._importResult = "Файл импорта не выбран";
        }
        else {
            try {
                await this._service.postImport(this._parentId, this._importFile);
                await this.reloadGrid();
                this._importResult = "Импорт прошел успешно";
            }
            catch (e) {
                this._importResult = JSON.stringify(e.error);
            }
        }        
    }

    public async setImportFile(file: File) {
        this._importFile = file;
    }

    public async toggleChecked(id: TKey) {
        var index = this._checkedItems.indexOf(id);
        if (index < 0) { this._checkedItems.push(id); }
        else {
            this._checkedItems = this._checkedItems.slice(0, index).concat(this._checkedItems.slice(index + 1, this._checkedItems.length));
        }
    }

    public async toggleCheckAll() {
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