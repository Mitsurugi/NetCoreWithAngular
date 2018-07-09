using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreWithAngular.Controllers
{        
    [Authorize]
    public class AnimeController : BaseApiController<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel>
    {        
        public AnimeController(IBaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel> service) : base(service)
        {
        }
    }
}
