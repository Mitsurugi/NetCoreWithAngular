using System;
using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using NetCoreWithAngular.Services;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.Controllers
{        
    public class AnimeController : BaseApiController<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel>
    {        
        public AnimeController(IBaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel> service) : base(service)
        {
        }
    }
}
