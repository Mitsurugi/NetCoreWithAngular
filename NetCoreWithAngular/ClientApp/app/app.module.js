var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from '../Core/Account/token.interceptor';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './Front/Components/NonFound/notFound.component';
import { AdminComponent } from './Admin/Components/AdminMain/admin.component';
import { AccountComponent } from './Admin/Components/Account/account.component';
import { MenuComponent } from './Admin/Components/Menu/menu.component';
import { BookComponent } from './Admin/Components/Book/book.component';
import { BookEditComponent } from './Admin/Components/Book/bookEdit.component';
import { AnimeComponent } from './Admin/Components/Anime/anime.component';
import { AnimeEditComponent } from './Admin/Components/Anime/animeEdit.component';
import { AnimeEpisodeComponent } from './Admin/Components/AnimeEpisode/animeEpisode.component';
import { FrontComponent } from './Front/Components/Front/front.component';
import { UsersComponent } from './Admin/Components/User/users.component';
import { LanguageInterceptor } from '../Core/Localization/language.interceptor';
import { LanguageComponent } from './Localizer/Component/language.component';
import { LoginComponent } from './Admin/Components/Login/login.component';
var adminRoutes = [
    { path: '', component: UsersComponent },
    { path: 'account', component: AccountComponent },
    { path: 'users', component: UsersComponent },
    { path: 'anime', component: AnimeComponent },
    { path: 'anime/create', component: AnimeEditComponent },
    { path: 'anime/edit/:id', component: AnimeEditComponent },
    { path: 'book', component: BookComponent },
    { path: 'book/create', component: BookEditComponent },
    { path: 'book/edit/:id', component: BookEditComponent },
    { path: 'AnimeEpisodes/:parentId', component: AnimeEpisodeComponent }
];
var frontRoutes = [
    { path: '', component: FrontComponent }
];
var appRoutes = [
    { path: '', component: FrontComponent, children: frontRoutes },
    { path: 'admin', component: AdminComponent, children: adminRoutes },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes), DragDropModule, MatSnackBarModule, BrowserAnimationsModule],
            declarations: [AppComponent, NotFoundComponent, LoginComponent, AdminComponent, AccountComponent, MenuComponent, AnimeComponent, AnimeEditComponent, BookComponent, BookEditComponent, FrontComponent, AnimeEpisodeComponent, UsersComponent, LanguageComponent],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
                { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, horizontalPosition: "center", verticalPosition: "top" } }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map