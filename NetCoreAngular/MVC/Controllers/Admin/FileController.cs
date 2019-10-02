using CoreLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using NetCoreAngular.Models;
using System.Threading.Tasks;

namespace NetCoreAngular.Controllers
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
