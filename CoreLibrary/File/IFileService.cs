using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IFileService<TFile, TKey>
        where TFile : FileModel<TKey>
    {
        CancellationToken CancellationToken { get; set; }

        Task<TFile> GetAsync(TKey id);
        Task DeleteAsync(TKey id);
        Task<TFile> UploadAsync(IFormFile file);
    }
}
