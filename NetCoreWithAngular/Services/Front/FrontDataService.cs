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

        public async Task<List<FrontDataViewModel>> GetAllAnimeAsync()
        {
            return await _animeRepository.GetQueryNoTracking().ProjectTo<FrontDataViewModel>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<List<FrontDataViewModel>> GetAllBooksAsync()
        {
            return await _bookRepository.GetQueryNoTracking().ProjectTo<FrontDataViewModel>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
