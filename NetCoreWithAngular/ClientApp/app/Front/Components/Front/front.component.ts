import { Component, OnInit } from '@angular/core';
import { FrontDataService } from '../../Services/frontData.service';
import { FrontData } from '../../Models/FrontData';
import { AnimeService } from '../../../Admin/Services/anime.service';

@Component({
    selector: 'front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css'],
    providers: [FrontDataService]
})
export class FrontComponent implements OnInit {

    _anime: FrontData[];
    _books: FrontData[];

    _service: FrontDataService;
    constructor(service: FrontDataService) {
        this._service = service;
        this._anime = new Array<FrontData>();
        this._books = new Array<FrontData>();
    }

    ngOnInit() {
        this._service.getAllAnime().subscribe((data: FrontData[]) => this._anime = data);
        this._service.getAllBooks().subscribe((data: FrontData[]) => this._books = data);
    }
}