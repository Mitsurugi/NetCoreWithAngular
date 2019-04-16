import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        

        var lang = "ru-RU";

        if (localStorage.getItem("lang")) {
            lang = localStorage.getItem("lang");
        }

        var cloned = req.clone({ headers: req.headers.delete("Accept-Language").append("Accept-Language", lang) });

        return next.handle(cloned);        
    }
}