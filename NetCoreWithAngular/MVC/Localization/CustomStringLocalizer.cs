using CoreLibrary.Localization;
using NetCoreWithAngular.Models;

namespace NetCoreWithAngular.Localization
{
    public class CustomStringLocalizer : CoreLibraryStringLocalizer
    {
        protected override void AddOrUpdateStrings()
        {
            var ruRUDict = _strings["ru-RU"];
            var enUSDict = _strings["en-US"];

            enUSDict.Add("Role.Admin", "Administrator");
            ruRUDict.Add("Role.Admin", "Администратор");

            enUSDict.Add("BookTitle", "Title");
            ruRUDict.Add("BookTitle", "Название");
            enUSDict.Add("BookAuthor", "Author");
            ruRUDict.Add("BookAuthor", "Автор");
            enUSDict.Add("BookPageCount", "Page count");
            ruRUDict.Add("BookPageCount", "Количество страниц");
            enUSDict.Add("BookGenre", "Genre");
            ruRUDict.Add("BookGenre", "Жанр");

            enUSDict.Add($"{typeof(Genre).Name}.{Genre.Fantasy}", "Fantasy");
            ruRUDict.Add($"{typeof(Genre).Name}.{Genre.Fantasy}", "Фэнтези");
            enUSDict.Add($"{typeof(Genre).Name}.{Genre.Horror}", "Horror");
            ruRUDict.Add($"{typeof(Genre).Name}.{Genre.Horror}", "Хорор");
            enUSDict.Add($"{typeof(Genre).Name}.{Genre.Drama}", "Drama");
            ruRUDict.Add($"{typeof(Genre).Name}.{Genre.Drama}", "Драма");
            enUSDict.Add($"{typeof(Genre).Name}.{Genre.SciFi}", "Sci-Fi");
            ruRUDict.Add($"{typeof(Genre).Name}.{Genre.SciFi}", "Sci-Fi");
        }
    }
}
