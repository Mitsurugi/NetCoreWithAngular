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

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeComponent extends CoreComponent<number, Anime> {

    _fileService: FileService<number>;
    _animeService: AnimeService;
    _orderBy = "Position";

    constructor(service: AnimeService, localizer: LocalizerService, fileService: FileService<number>, animeService: AnimeService, snackBar: MatSnackBar) {
        super(service, localizer, snackBar);
        this._fileService = fileService;
        this._animeService = animeService;
    }

    async deleteImageEditAsync() {        
        try {
            if (this._itemEdit.imageId != null) {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this._fileService.deleteAsync(this._itemEdit.imageId);
                this._itemEdit.imageId = null;
                popup.dismiss();
            }
        }
        catch (e) {
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }

    async deleteImageCreateAsync() {        
        try {
            if (this._itemCreate.imageId != null) {
                var popup = this._snackBar.open(this._localizer.localize("Loading"));
                await this._fileService.deleteAsync(this._itemCreate.imageId);
                this._itemCreate.imageId = null;
                popup.dismiss();
            }            
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }

    async uploadImageEditAsync(file: File) {        
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            let id = await this._fileService.uploadAsync(file);
            this._itemEdit.imageId = id;
            popup.dismiss();
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }

    async uploadImageCreateAsync(file: File) {        
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            await this.deleteImageCreateAsync();
            let id = await this._fileService.uploadAsync(file);
            this._itemCreate.imageId = id;
            popup.dismiss();
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }

    public async moveAsync(event: CdkDragDrop<Anime[]>) {
        try {
            var popup = this._snackBar.open(this._localizer.localize("Loading"));
            var id = this._items[event.previousIndex].id;
            var newPos = this._items[event.currentIndex].position;
            moveItemInArray(this._items, event.previousIndex, event.currentIndex);
            await this._animeService.moveAsync(id, newPos);
            await this.reloadGridAsync();
            popup.dismiss();
        }
        catch (e) {
            var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
        }
    }
}