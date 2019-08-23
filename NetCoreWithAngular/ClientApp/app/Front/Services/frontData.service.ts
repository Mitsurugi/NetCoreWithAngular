import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../Core/Services/core.service';
import { Observable } from 'rxjs';
import { FrontData } from '../Models/FrontData';

@Injectable()
export class FrontDataService {

    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    getAllAnime(): Observable<FrontData[]> {
        return this._http.get<FrontData[]> ('api/FrontData/GetAllAnime');
    }

    getAllBooks(): Observable<FrontData[]> {
        return this._http.get<FrontData[]>('api/FrontData/GetAllBooks');
    }
}