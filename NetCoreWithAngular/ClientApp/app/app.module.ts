import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from '../Core/token.interceptor';
import { AppComponent } from './app.component';
import { AdminComponent } from './Admin/Components/AdminMain/admin.component'
import { AccountComponent } from './Admin/Components/Account/account.component'
import { MenuComponent } from './Admin/Components/Menu/menu.component'
import { BookComponent } from './Admin/Components/Book/book.component'
import { AnimeComponent } from './Admin/Components/Anime/anime.component'
import { FrontComponent } from './Front/Components/Front/front.component'

const adminRoutes: Routes = [
    { path: '', component: AccountComponent },
    { path: 'account', component: AccountComponent },
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
    declarations: [AppComponent, AdminComponent, AccountComponent, MenuComponent, AnimeComponent, BookComponent, FrontComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }