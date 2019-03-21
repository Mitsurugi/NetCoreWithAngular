using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Services
{
    public class AnimeService : BaseService<Anime, int, AnimeViewModel>
    {
        private readonly IFileService<File, int> _fileService;

        public AnimeService(IRepository<Anime, int> repository, IMapper mapper, IFileService<File, int> fileService, IStringLocalizer localizer) : base(repository, mapper, localizer)
        {
            _fileService = fileService;
        }        

        public override Task<List<AnimeViewModel>> GetGridAsync(int pageSize, int pageNumber, string orderBy, AnimeViewModel filter, string searchString)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.AddAsync( new Anime { Title = $"Anime{i}", SeasonCount = (i % 2) + 1 });
                }
                _repository.SaveChangesAsync();
            }

            return base.GetGridAsync(pageSize, pageNumber, orderBy, filter, searchString);
        }

        public override async Task DeleteAsync(int id)
        {
            var delete = await GetByIdAsync(id);

            if (delete.ImageId.HasValue)
                await _fileService.DeleteAsync(delete.ImageId.Value);

            _repository.Delete(delete);
            await _repository.SaveChangesAsync();
        }
    }
}
