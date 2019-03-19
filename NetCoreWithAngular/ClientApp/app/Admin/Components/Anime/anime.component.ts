import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/Components/core.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../../Core/Services/file.service';
import { Anime } from '../../Models/Anime/anime';
import { read } from 'fs';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeComponent extends CoreComponent<number, Anime> {

    _fileService: FileService<number>;

    constructor(service: AnimeService, fileService: FileService<number>) {
        super(service, Anime, Anime, Anime, Anime);
        this._fileService = fileService;
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
}