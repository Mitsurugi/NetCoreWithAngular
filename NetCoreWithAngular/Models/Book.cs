using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.Models
{
    public class Anime : IEntity<int>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public int SeasonCount { get; set; }
    }
}
