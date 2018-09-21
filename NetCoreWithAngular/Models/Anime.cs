using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.Models
{
    public class Anime : IEntity<int>
    {
        [Required]
        public int Id { get; set; }

        public string Title { get; set; }

        public int? SeasonCount { get; set; }

        public int? ImageId { get; set; }

        public virtual File Image { get; set; }
    }
}
