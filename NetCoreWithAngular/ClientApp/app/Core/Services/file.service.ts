import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileService<TKey> {

    protected _http: HttpClient;
    protected _controller = "file";    

    constructor(http: HttpClient) {
        this._http = http;
    }

    delete(id: TKey): Observable<object>{
        return this._http.delete('api/' + this._controller + '/delete?id=' + id);
    }

    upload(file: File): Observable<TKey> {
        let formData = new FormData();
        formData.append("file", file);
        return this._http.post<any>('/api/' + this._controller + '/upload', formData);
    }

    download(id: TKey): Observable<Blob> {
        return this._http.get<Blob>('api/' + this._controller + '/download?id=' + id, { responseType: 'blob' as 'json' });
    }
}