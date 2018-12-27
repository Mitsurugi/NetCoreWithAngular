import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/Services/core.service';
import { Observable } from 'rxjs';
import { Anime } from '../Models/Anime/anime';

@Injectable()
export class AnimeService extends CoreService<number, Anime, Anime, Anime, Anime> {

    constructor(http: HttpClient) { super(http); this._controller = 'anime'; }
}