using NetCoreWithAngular.Models;
using CoreLibrary;
using AutoMapper;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Services
{
    public class AnimeEpisodeService : DependentService<AnimeEpisode, int, int, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel>
    {
        public AnimeEpisodeService(IRepository<AnimeEpisode, int> repository, IMapper mapper, IStringLocalizer localizer) : base(repository, mapper, localizer)
        {
        }
    }
}
