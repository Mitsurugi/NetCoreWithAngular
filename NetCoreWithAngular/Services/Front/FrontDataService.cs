using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace NetCoreWithAngular.Services
{
    public class FrontDataService : IFrontDataService
    {
        private readonly IRepository<Book, int> _bookRepository;
        private readonly IRepository<Anime, int> _animeRepository;
        protected readonly IMapper _mapper;

        public FrontDataService(IRepository<Book, int> bookRepository, IRepository<Anime, int> animeRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _animeRepository = animeRepository;
            _mapper = mapper;
        }

        public async Task<List<FrontDataViewModel>> GetAllAnime()
        {
            return await _animeRepository.GetQuery().ProjectTo<FrontDataViewModel>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<List<FrontDataViewModel>> GetAllBooks()
        {
            return await _bookRepository.GetQuery().ProjectTo<FrontDataViewModel>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
