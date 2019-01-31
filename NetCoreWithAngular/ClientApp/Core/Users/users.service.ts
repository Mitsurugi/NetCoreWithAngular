import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntity } from '../Models/IEntity'
import { StaticMethods } from '../Services/staticMethods';
import { IUser } from './IUser';

@Injectable()
export class UsersService<TKey, TGrid extends IUser<TKey>, TCreate extends IUser<TKey>, TEdit extends IUser<TKey>, TFilter> {

    _controller = "users";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    public async getPagesCount(pageSize: number, filter: TFilter): Promise<number> {
        return await this._http.get<number>('api/' + this._controller + '/getPagesCount?pageSize=' + pageSize, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getGrid(pageNumber: number, pageSize: number, orderBy: string, filter: TFilter): Promise<TGrid[]> {
        return await this._http.get<TGrid[]>('api/' + this._controller + '/grid?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&orderBy=' + orderBy, { params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();
    }

    public async getCreate(): Promise<TCreate> {
        return await this._http.get<TCreate>('api/' + this._controller + '/create').toPromise();
    }

    public async postCreate(item: TCreate): Promise<TCreate> {
        return await this._http.post<TCreate>('/api/' + this._controller + '/create', item).toPromise();
    }

    public async getEdit(id: TKey): Promise<TEdit> {
        return await this._http.get<TEdit>('api/' + this._controller + '/edit?id=' + id).toPromise();
    }

    public async postEdit(item: TEdit): Promise<TEdit> {
        return await this._http.post<TEdit>('/api/' + this._controller + '/edit', item).toPromise();
    }

    public async delete(id: TKey) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id).toPromise();
    }

    public async deleteMany(ids: TKey[]) {
        await this._http.delete('api/' + this._controller + '/deleteMany', { params: StaticMethods.ArrayToHttpParams('ids', ids) }).toPromise();
    }

    public async getFilter(): Promise<TFilter> {
        return await this._http.get<TFilter>('api/' + this._controller + '/getFilter').toPromise();
    }

    public async getExcelExport(orderBy: string, filter: TFilter): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/ExcelExport?orderBy=' + orderBy, { responseType: 'blob' as 'json', params: StaticMethods.ObjectToHttpParams('filter', filter) }).toPromise();        
    }

    public async getImportTemplate(): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/ImportTemplate', { responseType: 'blob' as 'json' }).toPromise();
    }

    public async postResetPassword(id: TKey, newPassword: string) {
        let formData = new FormData();
        formData.append("newPassword", newPassword);
        return await this._http.post('/api/' + this._controller + '/ResetPassword?id=' + id, formData).toPromise();
    }

    public async postImport(file: File) {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post('/api/' + this._controller + '/import', formData).toPromise();
    }
}