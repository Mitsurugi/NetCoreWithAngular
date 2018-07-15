using CoreLibrary;

namespace NetCoreWithAngular.ViewModels
{
    public class AnimeViewModel : IEntity<int>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int? SeasonCount { get; set; }
    }
}
