using CoreLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BookController : BaseApiController<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>
    {
        public BookController(IBaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
