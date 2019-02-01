import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileService<TKey> {

    _controller = "file";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    public async delete(id: TKey) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id).toPromise();
    }

    public async upload(file: File): Promise<TKey> {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post<any>('/api/' + this._controller + '/upload', formData).toPromise();
    }

    public async download(id: TKey): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/download?id=' + id, { responseType: 'blob' as 'json' }).toPromise();
    }
}