import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/core.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../Models/Book';

@Injectable()
export class BookService extends CoreService<Book, Book, Book> {

    constructor(http: HttpClient) { super(http); this._controller = 'book'; }

    postCreate(item: Book) {
        item.title = '!' + item.title + '!';
        return super.postCreate(item);
    }
    
    getGrid(pageNumber: number, pageSize: number): Observable<Book[]> {
        return super.getGrid(pageNumber, pageSize).pipe<Book[]>(map(response => {
            let b = new Book();
            b.id = 999;
            b.title = "fromService";
            b.author = "fromService";
            b.pageCount = 999;

            response.push(b);
            return response;
        }));
    }
}