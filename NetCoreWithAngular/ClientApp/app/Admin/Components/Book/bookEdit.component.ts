import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditComponent } from '../../../../Core/Components/edit.component';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/Book/book';
import { BookGrid } from '../../Models/book/bookGrid';
import { BookFilter } from '../../Models/book/bookFilter';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'book-edit',
    templateUrl: './bookEdit.component.html',
    styleUrls: ['./bookEdit.component.css'],
    providers: [BookService]
})
export class BookEditComponent extends EditComponent<number, BookGrid, Book, Book, BookFilter> {

    constructor(service: BookService, localizer: LocalizerService, route: ActivatedRoute, router: Router, snackBar: MatSnackBar) {
        super(service, localizer, snackBar, Book, Book, route, router, 'admin/book');
    }
}