import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DependentComponent } from '../../../../Core/Components/dependent.component';
import { AnimeEpisodeService } from '../../Services/animeEpisode.service';
import { AnimeEpisode } from '../../Models/AnimeEpisode/animeEpisode';
import { read } from 'fs';
import { ActivatedRoute } from "@angular/router";
import { Anime } from '../../Models/Anime/anime';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'anime-episodes',
    templateUrl: './animeEpisode.component.html',
    styleUrls: ['./animeEpisode.component.css'],
    providers: [AnimeEpisodeService]
})
export class AnimeEpisodeComponent extends DependentComponent<number, number, Anime, AnimeEpisode> {

    constructor(service: AnimeEpisodeService, localizer: LocalizerService, route: ActivatedRoute, snackBar: MatSnackBar) {
        super(service, localizer, snackBar, route);
    }
}