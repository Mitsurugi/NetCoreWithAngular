using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreLibrary.Localization;

namespace NetCoreWithAngular.Localization
{
    public class CustomStringLocalizer : CoreLibraryStringLocalizer
    {
        protected override void AddOrUpdateString()
        {
            var ruRUDict = _strings["ru-RU"];
            var enUSDict = _strings["en-US"];

            enUSDict.Add("BookTitle", "Title");
            ruRUDict.Add("BookTitle", "Название");
            enUSDict.Add("BookAuthor", "Author");
            ruRUDict.Add("BookAuthor", "Автор");
            enUSDict.Add("BookPageCount", "Page count");
            ruRUDict.Add("BookPageCount", "Количество страниц");
            enUSDict.Add("BookGenre", "Genre");
            ruRUDict.Add("BookGenre", "Жанр");

            enUSDict.Add("Genre.Fantasy", "Fantasy");
            ruRUDict.Add("Genre.Fantasy", "Фэнтези");
            enUSDict.Add("Genre.Horror", "Horror");
            ruRUDict.Add("Genre.Horror", "Хорор");
            enUSDict.Add("Genre.Drama", "Drama");
            ruRUDict.Add("Genre.Drama", "Драма");
            enUSDict.Add("Genre.Sci-Fi", "Sci-Fi");
            ruRUDict.Add("Genre.Sci-Fi", "Sci-Fi");
        }
    }
}
