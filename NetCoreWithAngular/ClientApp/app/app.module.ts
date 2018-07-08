import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './Admin/Components/AdminMain/admin.component'
import { MenuComponent } from './Admin/Components/Menu/menu.component'
import { BookComponent } from './Admin/Components/Book/book.component'
import { AnimeComponent } from './Admin/Components/Anime/anime.component'
import { FrontComponent } from './Front/Components/Front/front.component'

const adminRoutes: Routes = [
    { path: '', component: AnimeComponent },
    { path: 'anime', component: AnimeComponent },
    { path: 'book', component: BookComponent }
];

const frontRoutes: Routes = [
    { path: '', component: FrontComponent }
];

const appRoutes: Routes = [
    { path: '', component: FrontComponent, children: frontRoutes },
    { path: 'admin', component: AdminComponent, children: adminRoutes }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, AdminComponent, MenuComponent, AnimeComponent, BookComponent, FrontComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }