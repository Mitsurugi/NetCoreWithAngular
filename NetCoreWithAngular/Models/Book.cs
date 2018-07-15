using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.Models
{
    public enum Genre
    {
        Fantasy = 1,
        Horror = 2,
        Drama = 3,
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
