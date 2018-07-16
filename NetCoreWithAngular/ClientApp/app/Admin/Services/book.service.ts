import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/core.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../Models/Book/book';
import { BookGrid } from '../Models/book/bookGrid'
import { BookFilter } from '../Models/book/bookFilter'

@Injectable()
export class BookService extends CoreService<BookGrid, Book, Book, BookFilter> {

    constructor(http: HttpClient) { super(http); this._controller = 'book'; }

    postCreate(item: Book) {
        item.title = '!' + item.title + '!';
        return super.postCreate(item);
    }

    getGrid(pageNumber: number, pageSize: number, filter: BookFilter): Observable<BookGrid[]> {
        return super.getGrid(pageNumber, pageSize, filter).pipe<BookGrid[]>(map(response => {
            let b = new BookGrid();
            b.id = 999;
            b.title = "fromService";
            b.author = "fromService";
            b.pageCount = 999;

            response.push(b);
            return response;
        }));
    }
}