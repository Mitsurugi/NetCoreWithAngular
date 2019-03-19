import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditComponent } from '../../../../Core/Components/edit.component';
import { AnimeService } from '../../Services/anime.service';
import { FileService } from '../../../../Core/Services/file.service';
import { Anime } from '../../Models/Anime/anime';
import { read } from 'fs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'anime-edit',
    templateUrl: './animeEdit.component.html',
    styleUrls: ['./animeEdit.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeEditComponent extends EditComponent<number, Anime> {

    _fileService: FileService<number>;

    constructor(service: AnimeService, fileService: FileService<number>, route: ActivatedRoute, router: Router) {
        super(service, Anime, Anime, route, router, 'admin/anime');
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