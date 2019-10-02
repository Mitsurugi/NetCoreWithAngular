using Microsoft.AspNetCore.Mvc.Rendering;
using NetCoreAngular.Models;
using System.Collections.Generic;

namespace NetCoreAngular.ViewModels
{
    public class BookFilterModel
    {
        public string Title { get; set; }

        public string Author { get; set; }

        public int? PageCount { get; set; }

        public Genre? Genre { get; set; }

        public List<SelectListItem> GenreList { get; set; }
    }
}
