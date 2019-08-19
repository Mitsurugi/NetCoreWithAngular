using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace NetCoreWithAngular.Services
{
    public class FrontDataService : IFrontDataService
    {
        private readonly IRepository<Book, int> _bookRepository;
        private readonly IRepository<Anime, int> _animeRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContext;
        private CancellationToken _cancellationToken;

        public CancellationToken CancellationToken { get => _cancellationToken; set { _cancellationToken = value; _bookRepository.CancellationToken = value; _animeRepository.CancellationToken = value; } }

        public FrontDataService(IRepository<Book, int> bookRepository, IRepository<Anime, int> animeRepository, IMapper mapper, IHttpContextAccessor httpContext)
        {
            _bookRepository = bookRepository;
            _animeRepository = animeRepository;
            _mapper = mapper;
            _httpContext = httpContext;
            _cancellationToken = httpContext?.HttpContext?.RequestAborted ?? CancellationToken.None;
        }

        public async Task<List<FrontDataViewModel>> GetAllAnimeAsync()
        {
            return await _animeRepository.GetQueryNoTracking().ProjectTo<FrontDataViewModel>(_mapper.ConfigurationProvider).ToListAsync(_cancellationToken);
        }

        public async Task<List<FrontDataViewModel>> GetAllBooksAsync()
        {
            return await _bookRepository.GetQueryNoTracking().ProjectTo<FrontDataViewModel>(_mapper.ConfigurationProvider).ToListAsync(_cancellationToken);
        }
    }
}
