import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/Services/core.service';
import { Observable } from 'rxjs';
import { FileService } from '../../../Core/Services/file.service';
import { Anime } from '../Models/Anime/anime';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable()
export class AnimeService extends CoreService<number, Anime, Anime, Anime, Anime> {

    _fileService: FileService<number>;
    _sanitizer: DomSanitizer;

    constructor(http: HttpClient, fileService: FileService<number>, sanitaizer: DomSanitizer) { super(http); this._controller = 'anime'; this._fileService = fileService; this._sanitizer = sanitaizer; }

    async getGrid(pageNumber: number, pageSize: number, filter: Anime): Promise<Anime[]> {
        return super.getGrid(pageNumber, pageSize, filter).then(response => {            

            response.forEach(async i => {
                if (i.imageId) {
                    let blob = await this._fileService.download(i.imageId);
                    let url = window.URL.createObjectURL(blob);
                    i.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
                } else {
                    return null;
                }
            });
            return response;
        });
    }
}