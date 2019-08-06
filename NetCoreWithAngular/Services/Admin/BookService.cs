﻿using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.Extensions.Localization;
using Microsoft.EntityFrameworkCore;

namespace NetCoreWithAngular.Services
{
    public class BookService : BaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>
    {
        public BookService(IRepository<Book, int> repository, IMapper mapper, IStringLocalizer localizer) : base(repository, mapper, localizer)
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
            model.AsParallel().ForAll(i => i.GenreName = _localizer[$"{i.Genre.GetType().Name}.{i.Genre}"]);
            return model;
        }
    }    
}
