import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/Services/core.service';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book/book';
import { BookGrid } from '../Models/book/bookGrid';
import { BookFilter } from '../Models/book/bookFilter';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService extends CoreService<number, BookGrid, Book, Book, BookFilter> {

    constructor(http: HttpClient) { super(http); this._controller = 'book'; }

    saveCreateModel(item: Book) {
        item.title = '!' + item.title + '!';
        return super.saveCreateModel(item);
    }

    getGrid(pageNumber: number, pageSize: number, orderBy: string, filter: BookFilter): Observable<BookGrid[]> {
        return super.getGrid(pageNumber, pageSize, orderBy, filter).pipe(map(data => {
            let b = new BookGrid();
            b.id = 999;
            b.title = "fromService";
            b.author = "fromService";
            b.pageCount = 999;

            data.push(b);
            return data;
        }));
    }
}