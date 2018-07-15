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
            CreateMap<Book, BookGridModel>().ForMember(m => m.Genre, m => m.MapFrom(i => i.Genre.HasValue ? i.Genre.Value.ToString() : ""));
        }
    }
}
