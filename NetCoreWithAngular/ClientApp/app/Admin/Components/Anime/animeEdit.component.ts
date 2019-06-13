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

@Component({
    selector: 'anime-edit',
    templateUrl: './animeEdit.component.html',
    styleUrls: ['./animeEdit.component.css'],
    providers: [AnimeService, FileService]
})
export class AnimeEditComponent extends EditComponent<number, Anime> {

    _fileService: FileService<number>;

    constructor(service: AnimeService, localizer: LocalizerService, fileService: FileService<number>, route: ActivatedRoute, router: Router, snackBar: MatSnackBar) {
        super(service, localizer, snackBar, route, router, 'admin/anime');
        this._fileService = fileService;
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
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
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
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
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
            popup.dismiss();
            console.log(e);
            if (e.error) {
                var popup = this._snackBar.open(this._localizer.localizeWithValues("Error", e.error));
            }
        }
    }
}