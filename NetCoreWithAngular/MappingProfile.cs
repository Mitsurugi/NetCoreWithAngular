using CoreLibrary;
using AutoMapper;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;

namespace NetCoreWithAngular
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Book, BookViewModel>().ReverseMap();
            CreateMap<Anime, AnimeViewModel>().ReverseMap();
            CreateMap<AnimeEpisode, AnimeEpisodeViewModel>().ReverseMap();
            CreateMap<User, UserViewModel>().ReverseMap();            
        }
    }
}
