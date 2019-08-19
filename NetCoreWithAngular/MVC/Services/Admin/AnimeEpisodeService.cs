﻿using AutoMapper;
using CoreLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;

namespace NetCoreWithAngular.Services
{
    public class AnimeEpisodeService : DependentService<AnimeEpisode, int, AnimeEpisodeViewModel, int, Anime, AnimeViewModel>
    {
        public AnimeEpisodeService(IRepository<AnimeEpisode, int> repository, IRepository<Anime, int> parentRepository, IMapper mapper, IStringLocalizer localizer, IHttpContextAccessor httpContext) : base(repository, parentRepository, mapper, localizer, httpContext)
        {
        }
    }
}