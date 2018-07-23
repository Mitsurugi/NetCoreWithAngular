using CoreLibrary;
using NetCoreWithAngular.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace NetCoreWithAngular.ViewModels
{
    public class BookFilterModel
    {
        public string Title { get; set; }

        public string Author { get; set; }

        public int? PageCount { get; set; }

        public Genre? Genre { get; set; }

        public IEnumerable<SelectListItem> GenreList
        {
            get
            {
                yield return new SelectListItem { Value = "", Text = "", Selected = !Genre.HasValue };
                yield return new SelectListItem { Value = ((int)Models.Genre.Drama).ToString(), Text = Models.Genre.Drama.ToString(), Disabled = true };
                yield return new SelectListItem { Value = ((int)Models.Genre.Fantasy).ToString(), Text = Models.Genre.Fantasy.ToString() };
                yield return new SelectListItem { Value = ((int)Models.Genre.Horror).ToString(), Text = Models.Genre.Horror.ToString() };
                yield return new SelectListItem { Value = ((int)Models.Genre.SciFi).ToString(), Text = Models.Genre.SciFi.ToString() };
            }
        }
    }
}
