using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using NetCoreWithAngular.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AnimeController : BaseApiController<Anime, int, AnimeViewModel>
    {
        private readonly IAnimeService _animeService;

        public AnimeController(IBaseService<Anime, int, AnimeViewModel> service, IStringLocalizer localizer, IAnimeService animeService) : base(service, localizer)
        {
            _animeService = animeService;
        }

        [HttpPost]
        public async Task<IActionResult> MoveAsync([FromQuery] int id, [FromQuery] int newPosition)
        {
            try
            {
                await _animeService.MoveAsync(id, newPosition);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }
    }
}
