using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize]
    public class BookController : BaseApiController<Book, int, BookGridModel, BookViewModel, BookViewModel>
    {
        public BookController(IBaseService<Book, int, BookGridModel, BookViewModel, BookViewModel> service) : base(service)
        {
        }
    }
}
