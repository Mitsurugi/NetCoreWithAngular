import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DependentComponent } from '../../../../Core/Components/dependent.component';
import { AnimeEpisodeService } from '../../Services/animeEpisode.service';
import { AnimeEpisode } from '../../Models/AnimeEpisode/animeEpisode';
import { read } from 'fs';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'anime-episode',
    templateUrl: './animeEpisode.component.html',
    styleUrls: ['./animeEpisode.component.css'],
    providers: [AnimeEpisodeService]
})
export class AnimeEpisodeComponent extends DependentComponent<AnimeEpisode, AnimeEpisode, AnimeEpisode, AnimeEpisode> {

    constructor(service: AnimeEpisodeService, route: ActivatedRoute) {
        super(service, AnimeEpisode, AnimeEpisode, AnimeEpisode, AnimeEpisode, route);
    }
}