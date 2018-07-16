import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/core.component';
import { AnimeService } from '../../Services/anime.service';
import { Anime } from '../../Models/Anime/anime';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
    providers: [AnimeService]
})
export class AnimeComponent extends CoreComponent<Anime, Anime, Anime, Anime> {

    constructor(service: AnimeService) {
        super(service, Anime, Anime, Anime, Anime);
    }
}