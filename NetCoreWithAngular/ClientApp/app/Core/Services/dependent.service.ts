import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { IDependentEntity } from '../Models/IDependentEntity';
import { StaticMethods } from '../Services/staticMethods';

@Injectable()
export class DependentService<TKey, TParentKey, TParentView, TGrid extends IDependentEntity<TKey, TParentKey>, TCreate extends IDependentEntity<TKey, TParentKey> = TGrid, TEdit extends IDependentEntity<TKey, TParentKey> = TGrid, TFilter = TGrid> {

    protected _controller = "";
    protected _http: HttpClient;    

    constructor(http: HttpClient) {
        this._http = http;
    }

    getPagesCount(pageSize: number, parentId: TParentKey, filter: TFilter): Observable<number> {
        return this._http.get<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize + '&parentId=' + parentId, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    }

    getGrid(parentId: TParentKey, pageNumber: number, pageSize: number, orderBy: string, filter: TFilter): Observable<TGrid[]> {
        return this._http.get<TGrid[]>('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&parentId=' + parentId + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) });
    }

    getCreateModel(parentId: TParentKey): Observable<TCreate> {
        return this._http.get<TCreate>('api/' + this._controller + '/getCreateModel?parentId=' + parentId);
    }

    saveCreateModel(item: TCreate, parentId: TParentKey): Observable<TCreate> {
        return this._http.post<TCreate>('/api/' + this._controller + '/saveCreateModel?parentId=' + parentId, item);
    }

    getEditModel(id: TKey, parentId: TParentKey): Observable<TEdit> {
        return this._http.get<TEdit>('api/' + this._controller + '/getEditModel?id=' + id + '&parentId=' + parentId);
    }

    saveEditModel(item: TEdit, parentId: TParentKey): Observable<TEdit> {
        return this._http.post<TEdit>('/api/' + this._controller + '/saveEditModel?parentId=' + parentId, item);
    }

    delete(id: TKey, parentId: TParentKey): Observable<object> {
        return this._http.delete('api/' + this._controller + '/delete?id=' + id + '&parentId=' + parentId);
    }

    deleteMany(ids: TKey[], parentId: TParentKey): Observable<object> {
        return this._http.delete('api/' + this._controller + '/deleteMany?parentId=' + parentId, { params: StaticMethods.ArrayToHttpParams('ids', ids) });
    }

    getFilterModel(parentId: TParentKey): Observable<TFilter> {
        return this._http.get<TFilter>('api/' + this._controller + '/getFilterModel?parentId=' + parentId);
    }

    getExcelExport(parentId: TParentKey, orderBy: string, filter: TFilter): Observable<Blob> {
        return this._http.get<Blob>('api/' + this._controller + '/getExcelExport?parentId=' + parentId + '&orderBy=' + orderBy, { responseType: 'blob' as 'json', params: StaticMethods.ObjectToHttpParams('filter', filter) });
    }

    getImportTemplate(parentId: TParentKey): Observable<Blob> {
        return this._http.get<Blob>('api/' + this._controller + '/getImportTemplate?parentId=' + parentId, { responseType: 'blob' as 'json' });
    }

    import(pareintId: TParentKey, file: File): Observable<object> {
        let formData = new FormData();
        formData.append("file", file);
        return this._http.post('/api/' + this._controller + '/import?parentId=' + pareintId, formData);
    }

    getParent(parentId: TParentKey): Observable<TParentView> {
        return this._http.get<TParentView>('api/' + this._controller + '/getParent?parentId=' + parentId);
    }
}