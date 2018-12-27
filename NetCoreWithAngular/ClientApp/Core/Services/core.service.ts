import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CoreService<TGrid, TCreate, TEdit, TFilter> {

    _controller = "";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    async getPagesCount(pageSize: number, filter: TFilter): Promise<number> {
        return await this._http.post<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, filter).toPromise();
    }

    async getGrid(pageNumber: number, pageSize: number, filter: TFilter): Promise<TGrid[]> {
        return await this._http.post<TGrid[]>('api/' + this._controller + '/grid?pageNumber=' + pageNumber + '&pageSize=' + pageSize, filter).toPromise();
    }

    async getCreate(): Promise<TCreate> {
        return await this._http.get<TCreate>('api/' + this._controller + '/create').toPromise();
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
    async getExcelExport(filter: TFilter): Promise<Blob> {
        return await this._http.post<Blob>('api/' + this._controller + '/ExcelExport', filter, { responseType: 'blob' as 'json' }).toPromise();        
    }
    async getImportTemplate(): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/ImportTemplate', { responseType: 'blob' as 'json' }).toPromise();
    }
    async postImport(file: File) {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post('/api/' + this._controller + '/import', formData).toPromise();
    }
}