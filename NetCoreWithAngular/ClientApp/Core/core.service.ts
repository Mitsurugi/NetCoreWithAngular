import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CoreService<TGrid, TCreate, TEdit> {

    _controller = "";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    getPagesCount(pageSize: number): Observable<number> {
        return this._http.get<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize);
    }

    getGrid(pageNumber: number, pageSize: number): Observable<TGrid[]> {
        return this._http.get<TGrid[]>('api/' + this._controller + '/grid?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
    }

    getCreate(): Observable<TCreate> {
        return this._http.get<TCreate>('api/' + this._controller + '/create');
    }

    postCreate(item: TCreate): Observable<TCreate> {
        return this._http.post<TCreate>('/api/' + this._controller + '/create', item);
    }

    getEdit(id: any): Observable<TEdit> {
        return this._http.get<TEdit>('api/' + this._controller + '/edit?id=' + id);
    }

    postEdit(item: TEdit): Observable<TEdit> {
        return this._http.post<TEdit>('/api/' + this._controller + '/edit', item);
    }

    delete(id: any) {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    }
}