﻿import { Component, OnInit } from '@angular/core';
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
export class AnimeComponent extends CoreComponent<Anime, Anime, Anime, Anime> {

    _fileService: FileService;

    constructor(service: AnimeService, fileService: FileService) {
        super(service, Anime, Anime, Anime, Anime);
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
            this._error = JSON.stringify(e.error);
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
            this._error = JSON.stringify(e.error);
        }
    }

    async uploadImageEdit(file: File) {
        try {
            let id = await this._fileService.upload(file);
            this._itemEdit.imageId = id;
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }

    async uploadImageCreate(file: File) {
        try {
            await this.deleteImageCreate();
            let id = await this._fileService.upload(file);
            this._itemCreate.imageId = id;
        }
        catch (e) {
            this._error = JSON.stringify(e.error);
        }
    }
}