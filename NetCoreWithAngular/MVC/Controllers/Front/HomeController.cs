using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.Controllers
{

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}