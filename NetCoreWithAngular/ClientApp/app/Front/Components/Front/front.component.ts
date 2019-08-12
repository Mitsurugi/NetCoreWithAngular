import { Component, OnInit } from '@angular/core';
import { FrontDataService } from '../../Services/frontData.service';
import { FrontData } from '../../Models/FrontData';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

@Component({
    selector: 'front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css'],
    providers: [FrontDataService]
})
export class FrontComponent implements OnInit {

    protected _destroyed: Subject<void> = new Subject();
    protected _service: FrontDataService;

    anime: FrontData[];
    books: FrontData[];
    
    constructor(service: FrontDataService) {
        this._service = service;
        this.anime = new Array<FrontData>();
        this.books = new Array<FrontData>();
    }

    ngOnInit() {
        this._service.getAllAnime().pipe(takeUntil(this._destroyed)).subscribe((data: FrontData[]) => this.anime = data);
        this._service.getAllBooks().pipe(takeUntil(this._destroyed)).subscribe((data: FrontData[]) => this.books = data);
    }
}