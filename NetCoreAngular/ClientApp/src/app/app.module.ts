import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { TokenInterceptor } from './Core/Account/token.interceptor';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './Front/Components/NonFound/notFound.component';
import { AdminComponent } from './Admin/Components/AdminMain/admin.component'
import { AccountComponent } from './Admin/Components/Account/account.component'
import { MenuComponent } from './Admin/Components/Menu/menu.component'
import { BookComponent } from './Admin/Components/Book/book.component'
import { BookEditComponent } from './Admin/Components/Book/bookEdit.component'
import { AnimeComponent } from './Admin/Components/Anime/anime.component'
import { AnimeEditComponent } from './Admin/Components/Anime/animeEdit.component'
import { AnimeEpisodeComponent } from './Admin/Components/AnimeEpisode/animeEpisode.component'
import { FrontComponent } from './Front/Components/Front/front.component'
import { UsersComponent } from './Admin/Components/User/users.component';
import { LanguageInterceptor } from './Core/Localization/language.interceptor';
import { LanguageComponent } from './Localizer/Component/language.component';
import { LoginComponent } from './Admin/Components/Login/login.component';
import { YesNoComponent } from './Core/Components/YesNoDialog/yesNo.component';

const adminRoutes: Routes = [
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

const frontRoutes: Routes = [
    { path: '', component: FrontComponent }
];

const appRoutes: Routes = [
    { path: '', component: FrontComponent, children: frontRoutes },
    { path: 'admin', component: AdminComponent, children: adminRoutes },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, NotFoundComponent, LoginComponent, AdminComponent, AccountComponent, MenuComponent, AnimeComponent, AnimeEditComponent, BookComponent, BookEditComponent, FrontComponent, AnimeEpisodeComponent, UsersComponent, LanguageComponent, YesNoComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes), DragDropModule, MatSnackBarModule, BrowserAnimationsModule, MatDialogModule],
  entryComponents: [YesNoComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { horizontalPosition: "center", verticalPosition: "top" } }]
})
export class AppModule { }
