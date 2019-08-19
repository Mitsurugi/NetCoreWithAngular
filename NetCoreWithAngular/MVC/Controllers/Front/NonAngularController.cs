using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.Controllers
{
    [Route("NonAngular/[action]")]
    public class NonAngularController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}