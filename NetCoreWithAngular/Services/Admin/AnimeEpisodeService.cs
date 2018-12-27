using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreWithAngular.Services
{
    public class AnimeService : BaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel, AnimeViewModel>
    {
        private readonly IFileService<File, int> _fileService;

        public AnimeService(IRepository<Anime, int> repository, IMapper mapper, IFileService<File, int> fileService) : base(repository, mapper)
        {
            _fileService = fileService;
        }        

        public override Task<List<AnimeViewModel>> GetGrid(int pageSize, int pageNumber, AnimeViewModel filter = null)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.Add( new Anime { Title = $"Anime{i}", SeasonCount = (i % 2) + 1 });
                }
                _repository.SaveChanges();
            }

            return base.GetGrid(pageSize, pageNumber, filter);
        }

        public override async Task Delete(int id)
        {
            var delete = await Get(id);

            if (delete.ImageId.HasValue)
                await _fileService.Delete(delete.ImageId.Value);

            await _repository.Delete(delete);
            await _repository.SaveChanges();
        }
    }
}
