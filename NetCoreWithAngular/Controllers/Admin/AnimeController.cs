using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AnimeController : BaseApiController<Anime, int, AnimeViewModel>
    {        
        public AnimeController(IBaseService<Anime, int, AnimeViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
