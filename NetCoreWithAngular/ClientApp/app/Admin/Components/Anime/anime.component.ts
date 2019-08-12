import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/Components/core.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../../Core/Services/file.service';
import { Anime } from '../../Models/Anime/anime';
import { read } from 'fs';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeComponent extends CoreComponent<number, Anime> {

    protected _fileService: FileService<number>;
    protected _animeService: AnimeService;

    constructor(service: AnimeService, localizer: LocalizerService, fileService: FileService<number>, animeService: AnimeService, snackBar: MatSnackBar) {
        super(service, localizer, snackBar);
        this._fileService = fileService;
        this._animeService = animeService;
        this.orderBy = "Position";
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

    move(event: CdkDragDrop<Anime[]>) {
        var popup = this._snackBar.open(this._localizer.localize("Loading"));
        var id = this.items[event.previousIndex].id;
        var newPos = this.items[event.currentIndex].position;
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
        this._animeService.move(id, newPos).pipe(finalize(() => { if (popup) popup.dismiss(); }), takeUntil(this._destroyed)).subscribe(
            data => {
                this.reloadGrid();
            }
        );        
    }
}