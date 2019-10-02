using CoreLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using NetCoreAngular.Models;
using NetCoreAngular.ViewModels;

namespace NetCoreAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BookController : BaseApiController<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>
    {
        public BookController(IBaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
