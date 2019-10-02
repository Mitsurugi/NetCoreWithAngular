import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../Core/Services/core.service';
import { Observable, from } from 'rxjs';
import { FileService } from '../../Core/Services/file.service';
import { Anime } from '../Models/Anime/anime';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from "rxjs/operators";

@Injectable()
export class AnimeService extends CoreService<number, Anime> {

    protected _fileService: FileService<number>;
    protected _sanitizer: DomSanitizer;

    constructor(http: HttpClient, fileService: FileService<number>, sanitaizer: DomSanitizer) { super(http); this._controller = 'anime'; this._fileService = fileService; this._sanitizer = sanitaizer; }

    move(id: number, newPosition: number): Observable<object> {
        return this._http.post('api/' + this._controller + '/move?id=' + id + '&newPosition=' + newPosition, null);
    }

    getGrid(pageNumber: number, pageSize: number, orderBy: string, filter: Anime): Observable<Anime[]> {
        return super.getGrid(pageNumber, pageSize, orderBy, filter).pipe(map(data => {
            data.forEach(i => {
                if (i.imageId) {
                    this._fileService.download(i.imageId).subscribe(data => {
                        let url = window.URL.createObjectURL(data);
                        i.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
                    });                    
                }
            });
            return data;
        }));
    }
}
