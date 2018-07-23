using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.Models
{
    public enum Genre
    {
        [Display(Name ="Fantasy")]
        Fantasy = 1,
        [Display(Name = "Horror")]
        Horror = 2,
        [Display(Name = "Drama")]
        Drama = 3,
        [Display(Name = "Sci-Fi")]
        SciFi = 4
    }
    public class Book : IEntity<int>
    {
        [Required]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public int? PageCount { get; set; }

        public Genre? Genre { get; set; }
    }
}
