using System.Linq;
using CoreLibrary;
using NetCoreWithAngular.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.ViewModels
{
    public class BookViewModel : IEntity<int>
    {        
        [ImportIgnore]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Author")]
        public string Author { get; set; }

        [Display(Name = "Page count")]
        public int? PageCount { get; set; }
        
        [Display(Name = "Genre")]
        [HasList("GenreList")]
        public Genre? Genre { get; set; }

        [ImportIgnore]
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
