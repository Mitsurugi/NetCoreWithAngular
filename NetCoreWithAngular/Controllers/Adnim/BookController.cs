using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BookController : BaseApiController<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>
    {
        public BookController(IBaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel> service) : base(service)
        {
        }
    }
}
