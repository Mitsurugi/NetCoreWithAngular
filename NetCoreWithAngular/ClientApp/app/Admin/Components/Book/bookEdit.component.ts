import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditComponent } from '../../../../Core/Components/edit.component';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/Book/book';
import { BookGrid } from '../../Models/book/bookGrid';
import { BookFilter } from '../../Models/book/bookFilter';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'book-edit',
    templateUrl: './bookEdit.component.html',
    styleUrls: ['./bookEdit.component.css'],
    providers: [BookService]
})
export class BookEditComponent extends EditComponent<number, BookGrid, Book, Book, BookFilter> {

    constructor(service: BookService, route: ActivatedRoute, router: Router) {
        super(service, Book, Book, route, router, 'admin/book');
    }
}