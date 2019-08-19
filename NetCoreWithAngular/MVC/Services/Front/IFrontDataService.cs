using NetCoreWithAngular.ViewModels;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace NetCoreWithAngular.Services
{
    public interface IFrontDataService
    {
        CancellationToken CancellationToken { get; set; }
        Task<List<FrontDataViewModel>> GetAllBooksAsync();
        Task<List<FrontDataViewModel>> GetAllAnimeAsync();
    }
}
