import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntity } from '../Models/IEntity'
import { StaticMethods } from './staticMethods';

@Injectable()
export class CoreService<TKey, TGrid extends IEntity<TKey>, TCreate extends IEntity<TKey> = TGrid, TEdit extends IEntity<TKey> = TGrid, TFilter = TGrid> {

    protected _controller = "";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    getPagesCount(pageSize: number, filter: TFilter): Observable<number> {
        return this._http.get<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    }

    getGrid(pageNumber: number, pageSize: number, orderBy: string, filter: TFilter): Observable<TGrid[]> {
        return this._http.get<TGrid[]>('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    }

    getCreateModel(): Observable<TCreate> {
        return this._http.get<TCreate>('api/' + this._controller + '/getCreateModel');
    }

    saveCreateModel(item: TCreate): Observable<TCreate> {
        return this._http.post<TCreate>('/api/' + this._controller + '/saveCreateModel', item);
    }

    getEditModel(id: TKey): Observable<TEdit> {
        return this._http.get<TEdit>('api/' + this._controller + '/getEditModel?id=' + id);
    }

    saveEditModel(item: TEdit): Observable<TEdit> {
        return this._http.post<TEdit>('/api/' + this._controller + '/saveEditModel', item);
    }

    delete(id: TKey): Observable<object> {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    }

    deleteMany(ids: TKey[]): Observable<object> {
        return this._http.delete('api/' + this._controller + '/deleteMany', { params: StaticMethods.ArrayToHttpParams('ids', ids) });
    }

    getFilterModel(): Observable<TFilter> {
        return this._http.get<TFilter>('api/' + this._controller + '/getFilterModel');
    }

    getExcelExport(orderBy: string, filter: TFilter): Observable<Blob> {
        return this._http.get<Blob>('api/' + this._controller + '/getExcelExport?orderBy=' + orderBy, { responseType: 'blob' as 'json', params: StaticMethods.ObjectToHttpParams('filter', filter) });
    }

    getImportTemplate(): Observable<Blob> {
        return this._http.get<Blob>('api/' + this._controller + '/getImportTemplate', { responseType: 'blob' as 'json' });
    }

    import(file: File): Observable<object> {
        let formData = new FormData();
        formData.append("file", file);
        return this._http.post('/api/' + this._controller + '/import', formData);
    }
}