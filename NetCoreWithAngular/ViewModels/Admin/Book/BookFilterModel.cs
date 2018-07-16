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

        public List<SelectListItem> GenreList
        {
            get
            {
                var list = new List<SelectListItem> { new SelectListItem { Value = "", Text = "", Selected = !Genre.HasValue }};
                list.Add(new SelectListItem { Value = ((int)Models.Genre.Drama).ToString(), Text = Models.Genre.Drama.ToString(), Disabled = true });
                list.Add(new SelectListItem { Value = ((int)Models.Genre.Fantasy).ToString(), Text = Models.Genre.Fantasy.ToString() });
                list.Add(new SelectListItem { Value = ((int)Models.Genre.Horror).ToString(), Text = Models.Genre.Horror.ToString() });
                list.Add(new SelectListItem { Value = ((int)Models.Genre.SciFi).ToString(), Text = Models.Genre.SciFi.ToString() });
                return list;
            }
        }
    }
}
