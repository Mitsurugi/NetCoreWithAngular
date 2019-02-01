using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize]
    public class FileController : BaseFileController<File, int>
    {        
        public FileController(IFileService<File, int> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
        
        public override Task<IActionResult> Download(int id)
        {
            return base.Download(id);
        }
    }
}
