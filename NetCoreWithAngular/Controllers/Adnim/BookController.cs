using System;
using CoreLibrary;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using NetCoreWithAngular.Services;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.Controllers
{        
    public class BookController : BaseApiController<Book, int, BookViewModel, BookViewModel, BookViewModel>
    {
        public BookController(IBaseService<Book, int, BookViewModel, BookViewModel, BookViewModel> service) : base(service)
        {
        }
    }
}
