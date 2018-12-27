using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreWithAngular.Services
{
    public class AnimeEpisodeService : DependentService<AnimeEpisode, int, int, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel>
    {
        public AnimeEpisodeService(IRepository<AnimeEpisode, int> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
