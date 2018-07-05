using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.Models
{
    public class Book : IEntity<int>
    {
        [Required]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public int? PageCount { get; set; }
    }
}
