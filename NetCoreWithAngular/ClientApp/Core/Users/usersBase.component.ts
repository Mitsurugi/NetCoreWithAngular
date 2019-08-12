import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { IUser } from './IUser';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

@Component({
})
export class UsersBaseComponent<TKey, TGrid extends IUser<TKey>, TCreate extends IUser<TKey> = TGrid, TEdit extends IUser<TKey> = TGrid, TFilter = TGrid> implements OnInit {

    protected _destroyed: Subject<void> = new Subject();
    protected _service: UsersService<TKey, TGrid, TCreate, TEdit, TFilter>;
    protected _localizer: CoreLocalizerService;
    protected _snackBar: MatSnackBar;

    items: TGrid[];
    itemEdit: TEdit;
    itemCreate: TCreate;
    filter: TFilter;
    currentPage: number = 1;    
    totalPages: number = 1;
    pageSize: number = 10;
    isShowCreate = false;
    showEditId?: TKey = null;
    checkedItems: TKey[] = [];
    importFile: File = null;
    isShowImport: boolean;
    orderBy: string = 'UserName';
    resetPasswordId?: TKey = null;

    constructor(service: UsersService<TKey, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, snackBar: MatSnackBar) {
        this._service = service;
        this._localizer = localizer;
        this._snackBar = snackBar;
    }

    protected getCreateModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getCreateModel().pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.itemCreate = data;
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    protected getEditModel(id: TKey) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getEditModel(id).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.itemEdit = data;
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    ngOnInit() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getFilterModel().pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.filter = data;
                this.reloadGrid();
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    reloadGrid() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this.showEditId = null;
        this.resetPasswordId = null;

        this._service.getPagesCount(this.pageSize, this.filter).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.totalPages = data;
                if (this.currentPage < 1) this.currentPage = 1;
                if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
                this._service.getGrid(this.currentPage, this.pageSize, this.orderBy, this.filter).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
                    data => { this.items = data; if (popup) popup.dismiss(); },
                    e => {
                        console.log(e);
                        if (e.error) {
                            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                        }
                    }
                );
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    clearFilter() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getFilterModel().pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.filter = data;
                this.reloadGrid();
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );        
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.reloadGrid();            
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.reloadGrid();
        }
    }

    toggleCreate() {
        if (this.isShowCreate) {
            this.isShowCreate = false;
        }
        else {
            this.getCreateModel();
            this.isShowCreate = true;
            this.isShowImport = false;            
        }
    }

    toggleImport() {
        if (this.isShowImport) {
            this.isShowImport = false;
        }
        else {
            this.isShowImport = true;
            this.isShowCreate = false;            
        }
    }

    toggleEdit(id: TKey) {
        if (this.showEditId == id) {
            this.showEditId = null;
        }
        else {
            this.getEditModel(id);
            this.showEditId = id;
        }
    }

    delete(id: TKey) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.delete(id).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.reloadGrid();
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    deleteChecked() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.deleteMany(this.checkedItems).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.reloadGrid();
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    saveCreateModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveCreateModel(this.itemCreate).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.isShowCreate = false;
                this.getCreateModel();
                this.reloadGrid();
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    saveEditModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveEditModel(this.itemEdit).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.itemEdit = data;
                this.reloadGrid();
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    getExcelExport() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getExcelExport(this.orderBy, this.filter).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                saveAs(data, "ExcelExport.xlsx");
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );        
    }

    getImportTemplate() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getImportTemplate().pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                saveAs(data, "ImportTemplate.xlsx");
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );        
    }

    import() {
        if (this.importFile == null) {
            var popup = this._snackBar.open(this._localizer.localize("ImportFileNull"), null, { duration: 5000 });
        }
        else {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._service.import(this.importFile).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
                data => {
                    this.reloadGrid();
                    var popup = this._snackBar.open(this._localizer.localize("ImportSuccess"), null, { duration: 5000 });
                },
                e => {
                    console.log(e);
                    if (e.error) {
                        var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", JSON.stringify(e.error)));
                    }
                }
            );            
        }
    }

    setImportFile(file: File) {
        this.importFile = file;
    }

    toggleChecked(id: TKey) {
        var index = this.checkedItems.indexOf(id);
        if (index < 0) { this.checkedItems.push(id); }
        else {
            this.checkedItems = this.checkedItems.slice(0, index).concat(this.checkedItems.slice(index + 1, this.checkedItems.length));
        }
    }

    toggleCheckAll() {
        let checked = true;
        this.items.forEach(i => {
            var index = this.checkedItems.indexOf(i.id);
            if (index < 0) checked = false;
        });

        if (checked) {
            this.items.forEach(i => {
                var index = this.checkedItems.indexOf(i.id);
                this.checkedItems = this.checkedItems.slice(0, index).concat(this.checkedItems.slice(index + 1, this.checkedItems.length));
            });
        } else {
            this.items.forEach(i => {
                var index = this.checkedItems.indexOf(i.id);
                if (index < 0) { this.checkedItems.push(i.id); }
            });
        }
    }

    resetPassword(newPassword: string) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.resetPassword(this.resetPasswordId, newPassword).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.resetPasswordId = null;
                var popup = this._snackBar.open(this._localizer.localize("PassResetSuccess"), null, { duration: 5000 });
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );        
    }

    togglePasswordReset(id: TKey) {
        if (this.resetPasswordId == id) {
            this.resetPasswordId = null;
        }
        else {
            this.resetPasswordId = id;
        }
    }
}