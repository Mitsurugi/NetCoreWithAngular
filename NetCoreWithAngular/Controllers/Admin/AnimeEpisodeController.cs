using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AnimeEpisodeController : DependentApiController<AnimeEpisode, int, int, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel>
    {        
        public AnimeEpisodeController(IDependentService<AnimeEpisode, int, int, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel, AnimeEpisodeViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
