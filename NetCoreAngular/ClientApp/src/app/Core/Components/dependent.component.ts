import { Input, Component, OnInit } from '@angular/core';
import { DependentService } from '../Services/dependent.service';
import { IDependentEntity } from '../Models/IDependentEntity';
import { ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';
import { CoreLocalizerService } from '../Localization/coreLocalizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { YesNoComponent } from '../Components/YesNoDialog/yesNo.component';

@Component({
})
export class DependentComponent<TKey, TParentKey, TParentView, TGrid extends IDependentEntity<TKey, TParentKey>, TCreate extends IDependentEntity<TKey, TParentKey> = TGrid, TEdit extends IDependentEntity<TKey, TParentKey> = TGrid, TFilter = TGrid> implements OnInit {

    protected _destroyed: Subject<void> = new Subject();
    protected _service: DependentService<TKey, TParentKey, TParentView, TGrid, TCreate, TEdit, TFilter>;
    protected _localizer: CoreLocalizerService;
    protected _snackBar: MatSnackBar;
    protected _dialog: MatDialog;

    @Input() parentId: TParentKey;

    parent: TParentView;
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
    checkAllChecked: boolean[] = [];
    importFile: File = null;
    isShowImport: boolean;
    orderBy: string = 'Id_desc';


    constructor(service: DependentService<TKey, TParentKey, TParentView, TGrid, TCreate, TEdit, TFilter>, localizer: CoreLocalizerService, snackBar: MatSnackBar, dialog: MatDialog, route: ActivatedRoute) {
        this._service = service;
        this._localizer = localizer;
        this._snackBar = snackBar;
        this._dialog = dialog;

        if (!this.parentId) {
            route.params.subscribe(params => this.parentId = params['parentId']);
        }        
    }

    protected getCreateModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.getCreateModel(this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        this._service.getEditModel(id, this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        this._service.getParent(this.parentId).pipe(takeUntil(this._destroyed)).subscribe((data) => { this.parent = data; });
        this._service.getFilterModel(this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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

        this._service.getPagesCount(this.pageSize, this.parentId, this.filter).pipe(takeUntil(this._destroyed)).subscribe(
            data => {
                this.totalPages = data;
                if (this.currentPage < 1) this.currentPage = 1;
                if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
                this._service.getGrid(this.parentId, this.currentPage, this.pageSize, this.orderBy, this.filter).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        this._service.getFilterModel(this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        var dialogRef = this._dialog.open(YesNoComponent, {
            data: this._localizer.localize('DeleteConfirmation')
        });

        dialogRef.afterClosed().pipe(takeUntil(this._destroyed)).subscribe(result => {
            if (result) {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                this._service.delete(id, this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        });
    }

    deleteChecked() {
        var dialogRef = this._dialog.open(YesNoComponent, {
            data: this._localizer.localize('DeleteConfirmation')
        });

        dialogRef.afterClosed().pipe(takeUntil(this._destroyed)).subscribe(result => {
            if (result) {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                this._service.deleteMany(this.checkedItems, this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        });
    }

    saveCreateModel() {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._service.saveCreateModel(this.itemCreate, this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        this._service.saveEditModel(this.itemEdit, this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        this._service.getExcelExport(this.parentId, this.orderBy, this.filter).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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
        this._service.getImportTemplate(this.parentId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
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

    importPost() {
        if (this.importFile == null) {
            var popup = this._snackBar.open(this._localizer.localize("ImportFileNull"), null, { duration: 5000 });
        }
        else {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._service.import(this.parentId, this.importFile).pipe(takeUntil(this._destroyed)).subscribe(
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
}
