import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        

        const token = localStorage.getItem("token");

        if (token) {
            const cloned = req.clone({ headers: req.headers.append("Authorization", "Bearer " + token) });

            return next.handle(cloned).pipe(map(response => { return response; }), catchError((e, c) => { if (e.status === 401 || e.status === 403) { localStorage.removeItem("token"); this.router.navigate(['/admin/account']); } throw e; }));
        }
        else {
            return next.handle(req).pipe(map(response => { return response; }), catchError((e, c) => { if (e.status === 401 || e.status === 403) { localStorage.removeItem("token"); this.router.navigate(['/admin/account']); } throw e; }));
        }
    }
}