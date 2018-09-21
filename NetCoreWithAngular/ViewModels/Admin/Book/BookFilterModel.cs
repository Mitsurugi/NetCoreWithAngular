using CoreLibrary;
using NetCoreWithAngular.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq;

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
                foreach (var value in System.Enum.GetValues(typeof(Models.Genre)).Cast<Models.Genre>().ToList())
                {
                    yield return new SelectListItem { Value = ((int)value).ToString(), Text = value.GetDisplayName(), Disabled = value == Models.Genre.Drama };
                }
            }
        }
    }
}
