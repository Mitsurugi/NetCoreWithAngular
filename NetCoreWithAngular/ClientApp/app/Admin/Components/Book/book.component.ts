import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/core.component';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/Book/book';
import { BookGrid } from '../../Models/book/bookGrid';
import { BookFilter } from '../../Models/book/bookFilter';

@Component({
    selector: 'book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    providers: [BookService]
})
export class BookComponent extends CoreComponent<BookGrid, Book, Book, BookFilter> {

    constructor(service: BookService) {
        super(service, BookGrid, Book, Book, BookFilter);
        this.pageSize = 3;
    }

    async postCreate() {
        this.itemCreate.title = '*' + this.itemCreate.title + '*';
        await super.postCreate();
    }    
}