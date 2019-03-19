import { Injectable } from '@angular/core';
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
        return await this._http.get<TGrid[]>('api/' + this._controller + '/grid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&parentId=' + parentId + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getCreateAsync(parentId: TParentKey): Promise<TCreate> {
        return await this._http.get<TCreate>('api/' + this._controller + '/create?parentId=' + parentId).toPromise();
    }

    public async postCreateAsync(item: TCreate): Promise<TCreate> {
        return await this._http.post<TCreate>('/api/' + this._controller + '/create', item).toPromise();
    }

    public async getEditAsync(id: TKey): Promise<TEdit> {
        return await this._http.get<TEdit>('api/' + this._controller + '/edit?id=' + id).toPromise();
    }

    public async postEditAsync(item: TEdit): Promise<TEdit> {
        return await this._http.post<TEdit>('/api/' + this._controller + '/edit', item).toPromise();
    }

    public async deleteAsync(id: TKey) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id).toPromise();
    }

    public async deleteManyAsync(ids: TKey[]) {
        await this._http.delete('api/' + this._controller + '/deleteMany', { params: StaticMethods.ArrayToHttpParams('ids', ids) }).toPromise();
    }

    public async getFilterAsync(): Promise<TFilter> {
        return await this._http.get<TFilter>('api/' + this._controller + '/getFilter').toPromise();
    }

    public async getExcelExportAsync(parentId: TParentKey, orderBy: string, filter: TFilter): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/ExcelExport?parentId=' + parentId + '&orderBy=' + orderBy, { responseType: 'blob' as 'json', params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getImportTemplateAsync(): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/ImportTemplate', { responseType: 'blob' as 'json' }).toPromise();
    }

    public async postImportAsync(pareintId: TParentKey, file: File) {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post('/api/' + this._controller + '/import?parentId=' + pareintId, formData).toPromise();
    }

    public async getParentAsync(parentId: TParentKey): Promise<TParentView> {
        return await this._http.get<TParentView>('api/' + this._controller + '/GetParent?parentId=' + parentId).toPromise();
    }
}