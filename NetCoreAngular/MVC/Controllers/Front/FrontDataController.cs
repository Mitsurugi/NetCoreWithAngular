using Microsoft.AspNetCore.Mvc;
using NetCoreAngular.Services;
using NetCoreAngular.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCoreAngular.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FrontDataController : Controller
    {
        private readonly IFrontDataService _service;

        public FrontDataController(IFrontDataService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<List<FrontDataViewModel>> GetAllBooks()
        {
            return await _service.GetAllBooksAsync();
        }

        [HttpGet]
        public async Task<List<FrontDataViewModel>> GetAllAnime()
        {
            return await _service.GetAllAnimeAsync();
        }
    }
}
