using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AnimeController : BaseApiController<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel, AnimeViewModel>
    {        
        public AnimeController(IBaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel, AnimeViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
