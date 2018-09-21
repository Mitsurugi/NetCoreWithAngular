using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace NetCoreWithAngular.Controllers
{
    [Authorize]
    public class FileController : BaseFileController<File, int>
    {        
        public FileController(IFileService<File, int> service) : base(service)
        {
        }

        [AllowAnonymous]
        public override Task<IActionResult> Download(int id)
        {
            return base.Download(id);
        }
    }
}
