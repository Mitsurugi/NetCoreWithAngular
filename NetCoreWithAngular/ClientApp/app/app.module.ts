import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from '../Components/Book/book.component'
import { AnimeComponent } from '../Components/Anime/anime.component'

const appRoutes: Routes = [
    { path: 'anime', component: AnimeComponent },
    { path: 'book', component: BookComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, AnimeComponent, BookComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }