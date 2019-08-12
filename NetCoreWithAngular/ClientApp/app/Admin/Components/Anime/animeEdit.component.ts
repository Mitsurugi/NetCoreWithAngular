import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditComponent } from '../../../../Core/Components/edit.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../../Core/Services/file.service';
import { Anime } from '../../Models/Anime/anime';
import { read } from 'fs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'anime-edit',
    templateUrl: './animeEdit.component.html',
    styleUrls: ['./animeEdit.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeEditComponent extends EditComponent<number, Anime> {

    protected _fileService: FileService<number>;

    constructor(service: AnimeService, localizer: LocalizerService, fileService: FileService<number>, route: ActivatedRoute, router: Router, snackBar: MatSnackBar) {
        super(service, localizer, snackBar, route, router, 'admin/anime');
        this._fileService = fileService;
    }

    deleteImageEdit() {
        if (this.itemEdit.imageId != null) {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._fileService.delete(this.itemEdit.imageId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
                data => {
                    this.itemEdit.imageId = null;
                },
                e => {
                    console.log(e);
                    if (e.error) {
                        var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                    }
                }
            );
        }
    }

    deleteImageCreate() {
        if (this.itemCreate.imageId != null) {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            this._fileService.delete(this.itemCreate.imageId).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
                data => {
                    this.itemCreate.imageId = null;
                },
                e => {
                    console.log(e);
                    if (e.error) {
                        var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                    }
                }
            );
        }
    }

    uploadImageEdit(file: File) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._fileService.upload(file).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.itemEdit.imageId = data;
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }

    uploadImageCreate(file: File) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        this._fileService.upload(file).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this._fileService.delete(this.itemCreate.imageId).pipe(takeUntil(this._destroyed)).subscribe(() => {
                    this.itemCreate.imageId = data;
                });
            },
            e => {
                console.log(e);
                if (e.error) {
                    var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
                }
            }
        );
    }
}