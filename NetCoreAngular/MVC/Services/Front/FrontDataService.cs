using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoreLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular.Models;
using NetCoreAngular.ViewModels;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace NetCoreAngular.Services
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
