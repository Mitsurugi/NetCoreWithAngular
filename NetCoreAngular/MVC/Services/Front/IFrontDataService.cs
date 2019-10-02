using NetCoreAngular.ViewModels;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace NetCoreAngular.Services
{
    public interface IFrontDataService
    {
        CancellationToken CancellationToken { get; set; }
        Task<List<FrontDataViewModel>> GetAllBooksAsync();
        Task<List<FrontDataViewModel>> GetAllAnimeAsync();
    }
}
