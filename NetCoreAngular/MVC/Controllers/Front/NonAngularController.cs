using Microsoft.AspNetCore.Mvc;

namespace NetCoreAngular.Controllers
{
    public class NonAngularController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}