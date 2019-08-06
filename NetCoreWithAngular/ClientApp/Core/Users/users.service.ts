import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntity } from '../Models/IEntity'
import { StaticMethods } from '../Services/staticMethods';
import { IUser } from './IUser';

@Injectable()
export class UsersService<TKey, TGrid extends IUser<TKey>, TCreate extends IUser<TKey> = TGrid, TEdit extends IUser<TKey> = TGrid, TFilter = TGrid> {

    _controller = "users";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    public async getPagesCountAsync(pageSize: number, filter: TFilter): Promise<number> {
        return await this._http.get<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getGridAsync(pageNumber: number, pageSize: number, orderBy: string, filter: TFilter): Promise<TGrid[]> {
        return await this._http.get<TGrid[]>('api/' + this._controller + '/getGrid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getCreateModelAsync(): Promise<TCreate> {
        return await this._http.get<TCreate>('api/' + this._controller + '/getCreateModel').toPromise();
    }

    public async saveCreateModelAsync(item: TCreate): Promise<TCreate> {
        return await this._http.post<TCreate>('/api/' + this._controller + '/saveCreateModel', item).toPromise();
    }

    public async getEditModelAsync(id: TKey): Promise<TEdit> {
        return await this._http.get<TEdit>('api/' + this._controller + '/getEditModel?id=' + id).toPromise();
    }

    public async saveEditModelAsync(item: TEdit): Promise<TEdit> {
        return await this._http.post<TEdit>('/api/' + this._controller + '/saveEditModel', item).toPromise();
    }

    public async deleteAsync(id: TKey) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id).toPromise();
    }

    public async deleteManyAsync(ids: TKey[]) {
        await this._http.delete('api/' + this._controller + '/deleteMany', { params: StaticMethods.ArrayToHttpParams('ids', ids) }).toPromise();
    }

    public async getFilterModelAsync(): Promise<TFilter> {
        return await this._http.get<TFilter>('api/' + this._controller + '/getFilterModel').toPromise();
    }

    public async getExcelExportAsync(orderBy: string, filter: TFilter): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/getExcelExport?orderBy=' + orderBy, { responseType: 'blob' as 'json', params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();        
    }

    public async getImportTemplateAsync(): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/getImportTemplate', { responseType: 'blob' as 'json' }).toPromise();
    }

    public async resetPasswordAsync(id: TKey, newPassword: string) {
        let formData = new FormData();
        formData.append("newPassword", newPassword);
        return await this._http.post('/api/' + this._controller + '/ResetPassword?id=' + id, formData).toPromise();
    }

    public async importAsync(file: File) {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post('/api/' + this._controller + '/import', formData).toPromise();
    }
}