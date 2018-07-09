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
import { TokenInterceptor } from '../Core/token.interceptor';
import { AppComponent } from './app.component';
import { AdminComponent } from './Admin/Components/AdminMain/admin.component';
import { AccountComponent } from './Admin/Components/Account/account.component';
import { MenuComponent } from './Admin/Components/Menu/menu.component';
import { BookComponent } from './Admin/Components/Book/book.component';
import { AnimeComponent } from './Admin/Components/Anime/anime.component';
import { FrontComponent } from './Front/Components/Front/front.component';
var adminRoutes = [
    { path: '', component: AccountComponent },
    { path: 'account', component: AccountComponent },
    { path: 'anime', component: AnimeComponent },
    { path: 'book', component: BookComponent }
];
var frontRoutes = [
    { path: '', component: FrontComponent }
];
var appRoutes = [
    { path: '', component: FrontComponent, children: frontRoutes },
    { path: 'admin', component: AdminComponent, children: adminRoutes }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
            declarations: [AppComponent, AdminComponent, AccountComponent, MenuComponent, AnimeComponent, BookComponent, FrontComponent],
            providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map