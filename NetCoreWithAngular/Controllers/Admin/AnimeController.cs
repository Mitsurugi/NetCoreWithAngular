using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin, AnimeOnly")]
    public class AnimeController : BaseApiController<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel, AnimeViewModel>
    {        
        public AnimeController(IBaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel, AnimeViewModel> service) : base(service)
        {
        }
    }
}
