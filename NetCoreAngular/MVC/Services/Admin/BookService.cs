﻿using AutoMapper;
using CoreLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using NetCoreAngular.Models;
using NetCoreAngular.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Services
{
    public class BookService : BaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>
    {
        public BookService(IRepository<Book, int> repository, IMapper mapper, IStringLocalizer localizer, IHttpContextAccessor httpContext) : base(repository, mapper, localizer, httpContext)
        {
        }

        protected override IQueryable<Book> ApplySorting(IQueryable<Book> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy))
                return query.OrderByDescending(i => i.Id);

            return base.ApplySorting(query, orderBy);
        }

        protected override async Task<BookViewModel> FillCreateModelAsync(BookViewModel model)
        {
            model.GenreList = System.Enum.GetValues(typeof(Models.Genre)).Cast<Models.Genre>().Select(i => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Selected = model.Genre == i, Disabled = i == Genre.Drama, Text = _localizer[$"{i.GetType().Name}.{i}"], Value = ((int)i).ToString() }).ToList();
            return model;
        }

        protected override async Task<BookViewModel> FillEditModelAsync(BookViewModel model)
        {
            model.GenreList = System.Enum.GetValues(typeof(Models.Genre)).Cast<Models.Genre>().ToList().Select(i => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Selected = model.Genre == i, Disabled = i == Genre.Drama, Text = _localizer[$"{i.GetType().Name}.{i}"], Value = ((int)i).ToString() }).ToList();
            return model;
        }

        protected override async Task<BookFilterModel> FillFilterModelAsync(BookFilterModel model)
        {
            model.GenreList = System.Enum.GetValues(typeof(Models.Genre)).Cast<Models.Genre>().ToList().Select(i => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem { Selected = model.Genre == i, Disabled = i == Genre.Drama, Text = _localizer[$"{i.GetType().Name}.{i}"], Value = ((int)i).ToString() }).ToList();
            return model;
        }

        protected override async Task<List<BookGridModel>> FillGridModelAsync(List<BookGridModel> model)
        {
            model.ForEach(i => i.GenreName = _localizer[$"{i.Genre.GetType().Name}.{i.Genre}"]);
            return model;
        }

        protected override IQueryable<Book> ApplyFilter(IQueryable<Book> query, BookFilterModel filter)
        {
            if (!string.IsNullOrEmpty(filter.Author))
                query = query.Where(i => EF.Functions.Like(i.Author, $"%{filter.Author}%"));
            if (filter.Genre.HasValue)
                query = query.Where(i => i.Genre == filter.Genre);
            if (filter.PageCount.HasValue)
                query = query.Where(i => i.PageCount == filter.PageCount);
            if (!string.IsNullOrEmpty(filter.Title))
                query = query.Where(i => EF.Functions.Like(i.Title, $"%{filter.Title}%"));
            return query;
        }
    }
}
