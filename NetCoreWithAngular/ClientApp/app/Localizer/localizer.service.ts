import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreLocalizerService } from '../../Core/Localization/coreLocalizer.service';

@Injectable()
export class LocalizerService extends CoreLocalizerService {

    protected AddOrUpdateStrings() {

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
    }
}