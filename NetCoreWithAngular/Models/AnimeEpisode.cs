using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.Models
{
    public class AnimeEpisode : IDependentEntity<int, int>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int ParentId { get; set; }

        public string Title { get; set; }
        
        public virtual Anime Anime { get; set; }
    }
}
