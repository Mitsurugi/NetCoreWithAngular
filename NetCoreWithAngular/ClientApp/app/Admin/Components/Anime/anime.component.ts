import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/Components/core.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../../Core/Services/file.service';
import { Anime } from '../../Models/Anime/anime';
import { read } from 'fs';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeComponent extends CoreComponent<number, Anime> {

    _fileService: FileService<number>;
    _animeService: AnimeService;

    constructor(service: AnimeService, localizer: LocalizerService, fileService: FileService<number>, animeService: AnimeService) {
        super(service, localizer, Anime, Anime, Anime, Anime);
        this._fileService = fileService;
        this._animeService = animeService;
    }

    async deleteImageEditAsync() {
        this._message = null;
        try {
            if (this._itemEdit.imageId != null) {
                await this._fileService.deleteAsync(this._itemEdit.imageId);
                this._itemEdit.imageId = null;
            }
        }
        catch (e) {
            this._message = e.error;
        }
    }

    async deleteImageCreateAsync() {
        this._message = null;
        try {
            if (this._itemCreate.imageId != null) {
                await this._fileService.deleteAsync(this._itemCreate.imageId);
                this._itemCreate.imageId = null;
            }
        }
        catch (e) {
            this._message = e.error;
        }
    }

    async uploadImageEditAsync(file: File) {
        try {
            let id = await this._fileService.uploadAsync(file);
            this._itemEdit.imageId = id;
        }
        catch (e) {
            this._message = e.error;
        }
    }

    async uploadImageCreateAsync(file: File) {
        try {
            await this.deleteImageCreateAsync();
            let id = await this._fileService.uploadAsync(file);
            this._itemCreate.imageId = id;
        }
        catch (e) {
            this._message = e.error;
        }
    }

    public async moveAsync(event: CdkDragDrop<Anime[]>) {
        try {
            this._message = this._localizer.localize("Loading");
            var id = this._items[event.previousIndex].id;
            var newPos = this._items[event.currentIndex].position;
            moveItemInArray(this._items, event.previousIndex, event.currentIndex);
            await this._animeService.moveAsync(id, newPos);
            await this.reloadGridAsync();
            this._message = null;
        }
        catch (e) {
            this._message = this._localizer.localizeWithValues("Error", e.error);
        }
    }
}