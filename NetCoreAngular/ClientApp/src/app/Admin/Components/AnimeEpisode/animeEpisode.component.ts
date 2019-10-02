import { Component, OnInit } from '@angular/core';
import { DependentComponent } from '../../../Core/Components/dependent.component';
import { AnimeEpisodeService } from '../../Services/animeEpisode.service';
import { AnimeEpisode } from '../../Models/AnimeEpisode/animeEpisode';
import { ActivatedRoute } from "@angular/router";
import { Anime } from '../../Models/Anime/anime';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'anime-episodes',
    templateUrl: './animeEpisode.component.html',
    styleUrls: ['./animeEpisode.component.css'],
    providers: [AnimeEpisodeService]
})
export class AnimeEpisodeComponent extends DependentComponent<number, number, Anime, AnimeEpisode> {

    constructor(service: AnimeEpisodeService, localizer: LocalizerService, route: ActivatedRoute, snackBar: MatSnackBar, dialog: MatDialog) {
        super(service, localizer, snackBar, dialog, route);
    }
}
