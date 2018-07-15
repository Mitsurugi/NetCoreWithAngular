import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/core.component';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/Book';
import { BookGrid } from '../../Models/bookGrid';

@Component({
    selector: 'book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    providers: [BookService]
})
export class BookComponent extends CoreComponent<BookGrid, Book, Book> {

    constructor(service: BookService) {
        super(service, BookGrid, Book, Book);
        this.pageSize = 10;
    }

    postCreate() {
        this.itemCreate.title = '*' + this.itemCreate.title + '*';
        super.postCreate();
    }    
}