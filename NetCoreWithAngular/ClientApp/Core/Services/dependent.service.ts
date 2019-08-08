﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { IDependentEntity } from '../Models/IDependentEntity';
import { StaticMethods } from '../Services/staticMethods';

@Injectable()
export class DependentService<TKey, TParentKey, TParentView, TGrid extends IDependentEntity<TKey, TParentKey>, TCreate extends IDependentEntity<TKey, TParentKey> = TGrid, TEdit extends IDependentEntity<TKey, TParentKey> = TGrid, TFilter = TGrid> {

    _controller = "";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    public async getPagesCountAsync(pageSize: number, parentId: TParentKey, filter: TFilter): Promise<number> {
        return await this._http.get<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize + '&parentId=' + parentId, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getGridAsync(parentId: TParentKey, pageNumber: number, pageSize: number, orderBy: string, filter: TFilter): Promise<TGrid[]> {
        return await this._http.get<TGrid[]>('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&parentId=' + parentId + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getCreateModelAsync(parentId: TParentKey): Promise<TCreate> {
        return await this._http.get<TCreate>('api/' + this._controller + '/getCreateModel?parentId=' + parentId).toPromise();
    }

    public async saveCreateModelAsync(item: TCreate, parentId: TParentKey): Promise<TCreate> {
        return await this._http.post<TCreate>('/api/' + this._controller + '/saveCreateModel?parendId=' + parentId, item).toPromise();
    }

    public async getEditModelAsync(id: TKey, parentId: TParentKey): Promise<TEdit> {
        return await this._http.get<TEdit>('api/' + this._controller + '/getEditModel?id=' + id + '&parentId=' + parentId).toPromise();
    }

    public async saveEditModelAsync(item: TEdit, parentId: TParentKey): Promise<TEdit> {
        return await this._http.post<TEdit>('/api/' + this._controller + '/saveEditModel?parentId=' + parentId, item).toPromise();
    }

    public async deleteAsync(id: TKey, parentId: TParentKey, ) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id + '&parentId=' + parentId).toPromise();
    }

    public async deleteManyAsync(ids: TKey[], parentId: TParentKey) {
        await this._http.delete('api/' + this._controller + '/deleteMany?parentId=' + parentId, { params: StaticMethods.ArrayToHttpParams('ids', ids) }).toPromise();
    }

    public async getFilterModelAsync(parentId: TParentKey): Promise<TFilter> {
        return await this._http.get<TFilter>('api/' + this._controller + '/getFilterModel?parentId=' + parentId).toPromise();
    }

    public async getExcelExportAsync(parentId: TParentKey, orderBy: string, filter: TFilter): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/getExcelExport?parentId=' + parentId + '&orderBy=' + orderBy, { responseType: 'blob' as 'json', params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getImportTemplateAsync(parentId: TParentKey): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/getImportTemplate?parentId=' + parentId, { responseType: 'blob' as 'json' }).toPromise();
    }

    public async importAsync(pareintId: TParentKey, file: File) {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post('/api/' + this._controller + '/import?parentId=' + pareintId, formData).toPromise();
    }

    public async getParentAsync(parentId: TParentKey): Promise<TParentView> {
        return await this._http.get<TParentView>('api/' + this._controller + '/getParent?parentId=' + parentId).toPromise();
    }
}