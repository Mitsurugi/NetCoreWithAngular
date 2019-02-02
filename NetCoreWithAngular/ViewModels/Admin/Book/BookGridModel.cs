using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.ViewModels
{
    public class BookGridModel : IEntity<int>
    {
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Display(Name = "BookTitle")]
        public string Title { get; set; }

        [Display(Name = "BookAuthor")]
        public string Author { get; set; }

        [Display(Name = "BookPageCount")]
        public int? PageCount { get; set; }

        [Display(Name = "BookGenre")]
        public string Genre { get; set; }
    }
}
