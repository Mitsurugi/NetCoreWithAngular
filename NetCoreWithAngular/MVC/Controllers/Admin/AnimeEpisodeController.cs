using CoreLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AnimeEpisodeController : DependentApiController<AnimeEpisode, int, AnimeEpisodeViewModel, int, Anime, AnimeViewModel>
    {
        public AnimeEpisodeController(IDependentService<AnimeEpisode, int, AnimeEpisodeViewModel, int, Anime, AnimeViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
