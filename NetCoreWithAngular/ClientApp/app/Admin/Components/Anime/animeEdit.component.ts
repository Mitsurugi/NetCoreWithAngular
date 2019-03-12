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

    async deleteImageEdit() {
        this._error = null;
        try {
            if (this._itemEdit.imageId != null) {
                await this._fileService.delete(this._itemEdit.imageId);
                this._itemEdit.imageId = null;
            }
        }
        catch (e) {
            this._error = e.error;
        }
    }

    async deleteImageCreate() {
        this._error = null;
        try {
            if (this._itemCreate.imageId != null) {
                await this._fileService.delete(this._itemCreate.imageId);
                this._itemCreate.imageId = null;
            }
        }
        catch (e) {
            this._error = e.error;
        }
    }

    async uploadImageEdit(file: File) {
        try {
            let id = await this._fileService.upload(file);
            this._itemEdit.imageId = id;
        }
        catch (e) {
            this._error = e.error;
        }
    }

    async uploadImageCreate(file: File) {
        try {
            await this.deleteImageCreate();
            let id = await this._fileService.upload(file);
            this._itemCreate.imageId = id;
        }
        catch (e) {
            this._error = e.error;
        }
    }
}