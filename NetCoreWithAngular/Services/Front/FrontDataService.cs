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

        public FrontDataService(IRepository<Book, int> bookRepository, IRepository<Anime, int> animeRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _animeRepository = animeRepository;
        }

        public async Task<List<FrontDataViewModel>> GetAllAnime()
        {
            return await _animeRepository.GetQuery().ProjectTo<FrontDataViewModel>().ToListAsync();
        }

        public async Task<List<FrontDataViewModel>> GetAllBooks()
        {
            return await _bookRepository.GetQuery().ProjectTo<FrontDataViewModel>().ToListAsync();
        }
    }
}
