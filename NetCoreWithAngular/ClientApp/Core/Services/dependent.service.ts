import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDependentEntity } from '../Models/IDependentEntity';

@Injectable()
export class DependentService<TKey, TParentKey, TGrid extends IDependentEntity<TKey, TParentKey>, TCreate extends IDependentEntity<TKey, TParentKey>, TEdit extends IDependentEntity<TKey, TParentKey>, TFilter> {

    _controller = "";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    async getPagesCount(pageSize: number, parentId: any, filter: TFilter): Promise<number> {
        return await this._http.post<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize + '&parentId=' + parentId, filter).toPromise();
    }

    async getGrid(pageNumber: number, pageSize: number, parentId: any, filter: TFilter): Promise<TGrid[]> {
        return await this._http.post<TGrid[]>('api/' + this._controller + '/grid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&parentId=' + parentId, filter).toPromise();
    }

    async getCreate(parentId: any): Promise<TCreate> {
        return await this._http.get<TCreate>('api/' + this._controller + '/create?parentId=' + parentId).toPromise();
    }

    async postCreate(item: TCreate): Promise<TCreate> {
        return await this._http.post<TCreate>('/api/' + this._controller + '/create', item).toPromise();
    }

    async getEdit(id: any): Promise<TEdit> {
        return await this._http.get<TEdit>('api/' + this._controller + '/edit?id=' + id).toPromise();
    }

    async postEdit(item: TEdit): Promise<TEdit> {
        return await this._http.post<TEdit>('/api/' + this._controller + '/edit', item).toPromise();
    }

    async delete(id: any) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id).toPromise();
    }
    async getFilter(): Promise<TFilter> {
        return await this._http.get<TFilter>('api/' + this._controller + '/getFilter').toPromise();
    }
    async getExcelExport(filter: TFilter, parentId: any): Promise<Blob> {
        return await this._http.post<Blob>('api/' + this._controller + '/ExcelExport?parentId=' + parentId, filter, { responseType: 'blob' as 'json' }).toPromise();        
    }
    async getImportTemplate(): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/ImportTemplate', { responseType: 'blob' as 'json' }).toPromise();
    }
    async postImport(pareintId: any, file: File) {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post('/api/' + this._controller + '/import?parentId=' + pareintId, formData).toPromise();
    }
}