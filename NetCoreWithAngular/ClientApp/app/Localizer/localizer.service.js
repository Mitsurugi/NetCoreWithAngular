var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { CoreLocalizerService } from '../../Core/Localization/coreLocalizer.service';
var LocalizerService = /** @class */ (function (_super) {
    __extends(LocalizerService, _super);
    function LocalizerService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalizerService.prototype.AddOrUpdateStrings = function () {
        this._strings["ru-RU"]["RequiredX"] = "Поле {0} обязательно";
        this._strings["en-US"]["RequiredX"] = "{0} required";
        this._strings["ru-RU"]["Users"] = "Пользователи";
        this._strings["en-US"]["Users"] = "Users";
        this._strings["ru-RU"]["Phone"] = "Телефон";
        this._strings["en-US"]["Phone"] = "Phone";
        this._strings["ru-RU"]["OnlyDigitsAllowed"] = "Можно вводить только цифры";
        this._strings["en-US"]["OnlyDigitsAllowed"] = "Only digits allowed";
        this._strings["ru-RU"]["OnlyLettersAllowed"] = "Можно вводить только буквы";
        this._strings["en-US"]["OnlyLettersAllowed"] = "Only letters allowed";
        this._strings["ru-RU"]["OnlyDigitsAndLettersAllowed"] = "Можно вводить только буквы и цифры";
        this._strings["en-US"]["OnlyDigitsAndLettersAllowed"] = "Only digits and letters allowed";
        this._strings["ru-RU"]["AccountLabel"] = "Мой аккаунт";
        this._strings["en-US"]["AccountLabel"] = "My account";
        this._strings["ru-RU"]["Books"] = "Книги";
        this._strings["en-US"]["Books"] = "Books";
        this._strings["ru-RU"]["Book"] = "Книга";
        this._strings["en-US"]["Book"] = "Book";
        this._strings["ru-RU"]["Book.Title"] = "Название";
        this._strings["en-US"]["Book.Title"] = "Title";
        this._strings["ru-RU"]["Book.Title"] = "Название";
        this._strings["en-US"]["Book.Title"] = "Title";
        this._strings["ru-RU"]["Book.Author"] = "Автор";
        this._strings["en-US"]["Book.Author"] = "Author";
        this._strings["ru-RU"]["Book.Genre"] = "Жанр";
        this._strings["en-US"]["Book.Genre"] = "Genre";
        this._strings["ru-RU"]["Book.PageCount"] = "Количество страниц";
        this._strings["en-US"]["Book.PageCount"] = "Number of pages";
        this._strings["ru-RU"]["AnimeEpisodes"] = "Серии аниме";
        this._strings["en-US"]["AnimeEpisodes"] = "Anime episodes";
        this._strings["ru-RU"]["AnimeEpisode.Title"] = "Название";
        this._strings["en-US"]["AnimeEpisode.Title"] = "Title";
        this._strings["ru-RU"]["Animes"] = "Аниме";
        this._strings["en-US"]["Animes"] = "Anime";
        this._strings["ru-RU"]["Anime"] = "Аниме";
        this._strings["en-US"]["Anime"] = "Anime";
        this._strings["ru-RU"]["Anime.Title"] = "Название";
        this._strings["en-US"]["Anime.Title"] = "Title";
        this._strings["ru-RU"]["Anime.SeasonCount"] = "Количество сезонов";
        this._strings["en-US"]["Anime.SeasonCount"] = "Number of seasons";
        this._strings["ru-RU"]["Anime.Image"] = "Изображение";
        this._strings["en-US"]["Anime.Image"] = "Image";
        this._strings["ru-RU"]["Anime.ViewEpisodesButton"] = "Посмотреть эпизоды";
        this._strings["en-US"]["Anime.ViewEpisodesButton"] = "View episodes";
    };
    LocalizerService = __decorate([
        Injectable()
    ], LocalizerService);
    return LocalizerService;
}(CoreLocalizerService));
export { LocalizerService };
//# sourceMappingURL=localizer.service.js.map