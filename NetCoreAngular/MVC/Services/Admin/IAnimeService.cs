using System.Threading;
using System.Threading.Tasks;

namespace NetCoreAngular.Services
{
    public interface IAnimeService
    {
        CancellationToken CancellationToken { get; set; }
        Task MoveAsync(int id, int newPosition);
    }
}
