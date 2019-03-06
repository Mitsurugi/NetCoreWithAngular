﻿using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using AutoMapper;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Services
{
    public class AnimeEpisodeService : DependentService<AnimeEpisode, int, AnimeEpisodeViewModel, int, Anime, AnimeViewModel>
    {
        public AnimeEpisodeService(IRepository<AnimeEpisode, int> repository, IRepository<Anime, int> parentRepository, IMapper mapper, IStringLocalizer localizer) : base(repository, parentRepository, mapper, localizer)
        {
        }
    }
}
