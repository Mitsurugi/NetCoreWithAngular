import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreComponent } from '../../../../Core/Components/core.component';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/Book/book';
import { BookGrid } from '../../Models/book/bookGrid';
import { BookFilter } from '../../Models/book/bookFilter';
import { LocalizerService } from '../../../Localizer/localizer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'books',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    providers: [BookService]
})
export class BookComponent extends CoreComponent<number, BookGrid, Book, Book, BookFilter> {

    constructor(service: BookService, localizer: LocalizerService, snackBar: MatSnackBar) {
        super(service, localizer, snackBar, BookGrid, Book, Book, BookFilter);
        this._pageSize = 3;
    }

    async saveCreateModelAsync() {
        this._itemCreate.title = '*' + this._itemCreate.title + '*';
        await super.saveCreateModelAsync();
    }    
}