using AutoMapper;
using NetCoreAngular.Models;
using NetCoreAngular.ViewModels;

namespace NetCoreAngular
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Book, BookViewModel>().ReverseMap();
            CreateMap<Book, BookGridModel>();
            CreateMap<Anime, AnimeViewModel>().ReverseMap();
            CreateMap<AnimeEpisode, AnimeEpisodeViewModel>().ReverseMap();
            CreateMap<User, UserViewModel>().ReverseMap();
            CreateMap<Book, FrontDataViewModel>();
            CreateMap<Anime, FrontDataViewModel>();
        }
    }
}
