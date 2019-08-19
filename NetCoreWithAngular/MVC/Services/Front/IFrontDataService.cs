using NetCoreWithAngular.ViewModels;
using System.Threading.Tasks;
using System.Threading;
using System.Collections.Generic;

namespace NetCoreWithAngular.Services
{
    public interface IFrontDataService
    {
        CancellationToken CancellationToken { get; set; }
        Task<List<FrontDataViewModel>> GetAllBooksAsync();
        Task<List<FrontDataViewModel>> GetAllAnimeAsync();
    }
}
