using System.Threading;
using System.Threading.Tasks;

namespace NetCoreWithAngular.Services
{
    public interface IAnimeService
    {
        CancellationToken CancellationToken { get; set; }
        Task MoveAsync(int id, int newPosition);
    }
}
