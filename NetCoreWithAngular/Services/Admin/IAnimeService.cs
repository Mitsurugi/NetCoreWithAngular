using NetCoreWithAngular.ViewModels;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace NetCoreWithAngular.Services
{
    public interface IFrontDataService
    {
        Task<List<FrontDataViewModel>> GetAllBooksAsync();
        Task<List<FrontDataViewModel>> GetAllAnimeAsync();
    }
}
