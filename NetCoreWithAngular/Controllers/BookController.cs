using System;
using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using NetCoreWithAngular.Services;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookController : BaseApiController<Book, int, BookViewModel, BookViewModel, BookViewModel>
    {
        private IBookService _bookService { get; set; }

        public BookController(IBaseService<Book, int, BookViewModel, BookViewModel, BookViewModel> service, IBookService bookService) : base(service)
        {
            _bookService = bookService;
            _pageSize = 5;
        }
    }
}
