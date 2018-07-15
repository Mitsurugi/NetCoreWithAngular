using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreWithAngular.Services
{
    public class AnimeService : BaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel>
    {
        public AnimeService(IRepository<Anime, int> repository, IMapper mapper) : base(repository, mapper)
        {            
        }        

        public override Task<List<AnimeViewModel>> GetGrid(int pageSize, int pageNumber)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.Add( new Anime { Title = $"Anime{i}", SeasonCount = (i % 2) + 1 });
                }
                _repository.SaveChanges();
            }

            return base.GetGrid(pageSize, pageNumber);
        }
    }
}
