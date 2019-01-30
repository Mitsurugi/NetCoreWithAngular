using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin, AnimeOnly")]
    public class AnimeEpisodeController : DependentApiController<AnimeEpisode, int, int, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel>
    {        
        public AnimeEpisodeController(IDependentService<AnimeEpisode, int, int, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel> service) : base(service)
        {
        }
    }
}
