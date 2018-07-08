import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/core.service';
import { Observable } from 'rxjs';
import { Anime } from '../Models/Anime';

@Injectable()
export class AnimeService extends CoreService<Anime, Anime, Anime> {

    constructor(http: HttpClient) { super(http); this._controller = 'anime'; }
}