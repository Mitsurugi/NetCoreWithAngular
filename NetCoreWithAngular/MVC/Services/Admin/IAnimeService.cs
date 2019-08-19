using NetCoreWithAngular.ViewModels;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace NetCoreWithAngular.Services
{
    public interface IAnimeService
    {
        Task MoveAsync(int id, int newPosition);
    }
}
