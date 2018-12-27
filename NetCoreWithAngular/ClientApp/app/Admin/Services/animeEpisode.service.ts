import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DependentService } from '../../../Core/Services/dependent.service';
import { Observable } from 'rxjs';
import { AnimeEpisode } from '../Models/AnimeEpisode/animeEpisode';

@Injectable()
export class AnimeEpisodeService extends DependentService<AnimeEpisode, AnimeEpisode, AnimeEpisode, AnimeEpisode> {

    constructor(http: HttpClient) { super(http); this._controller = 'animeEpisode'; }
}