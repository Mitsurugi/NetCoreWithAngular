using Microsoft.AspNetCore.Mvc;

namespace NetCoreAngular.Controllers
{

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}