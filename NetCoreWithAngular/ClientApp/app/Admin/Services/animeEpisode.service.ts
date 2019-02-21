import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DependentService } from '../../../Core/Services/dependent.service';
import { Observable } from 'rxjs';
import { AnimeEpisode } from '../Models/AnimeEpisode/animeEpisode';
import { Anime } from '../Models/Anime/anime';

@Injectable()
export class AnimeEpisodeService extends DependentService<number, AnimeEpisode, AnimeEpisode, AnimeEpisode, AnimeEpisode, number, Anime> {

    constructor(http: HttpClient) { super(http); this._controller = 'animeEpisode'; }
}