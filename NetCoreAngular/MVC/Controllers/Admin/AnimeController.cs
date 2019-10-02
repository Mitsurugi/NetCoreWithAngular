using CoreLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using NetCoreAngular.Models;
using NetCoreAngular.Services;
using NetCoreAngular.ViewModels;
using System;
using System.Threading.Tasks;

namespace NetCoreAngular.Controllers
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
        public async Task<IActionResult> Move([FromQuery] int id, [FromQuery] int newPosition)
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
