import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../Core/Services/core.service';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book/book';
import { BookGrid } from '../Models/book/bookGrid'
import { BookFilter } from '../Models/book/bookFilter'

@Injectable()
export class BookService extends CoreService<number, BookGrid, Book, Book, BookFilter> {

    constructor(http: HttpClient) { super(http); this._controller = 'book'; }

    async saveCreateModelAsync(item: Book) {
        item.title = '!' + item.title + '!';
        return super.saveCreateModelAsync(item);
    }

    async getGridAsync(pageNumber: number, pageSize: number, orderBy: string, filter: BookFilter): Promise<BookGrid[]> {
        return super.getGridAsync(pageNumber, pageSize, orderBy, filter).then(response => {
            let b = new BookGrid();
            b.id = 999;
            b.title = "fromService";
            b.author = "fromService";
            b.pageCount = 999;

            response.push(b);
            return response;
        });
    }
}