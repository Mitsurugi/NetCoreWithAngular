using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.ViewModels
{
    public class BookGridModel : IEntity<int>
    {
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Author")]
        public string Author { get; set; }

        [Display(Name = "Page count")]
        public int? PageCount { get; set; }

        [Display(Name = "Genre")]
        public string Genre { get; set; }
    }
}
