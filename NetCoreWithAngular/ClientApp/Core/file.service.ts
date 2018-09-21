﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileService {

    _controller = "file";
    protected _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    async delete(id: any) {
        await this._http.delete('api/' + this._controller + '/delete?id=' + id).toPromise();
    }

    async download(id: any): Promise<Blob> {
        return await this._http.get<Blob>('api/' + this._controller + '/download?id=' + id, { responseType: 'blob' as 'json' }).toPromise();
    }

    async upload(file: File): Promise<any> {
        let formData = new FormData();
        formData.append("file", file);
        return await this._http.post<any>('/api/' + this._controller + '/upload', formData).toPromise();
    }
}