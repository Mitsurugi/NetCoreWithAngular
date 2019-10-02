using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreAngular.ViewModels
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

        [ExportHide]
        public NetCoreAngular.Models.Genre Genre { get; set; }

        [Display(Name = "BookGenre")]
        public string GenreName { get; set; }
    }
}
