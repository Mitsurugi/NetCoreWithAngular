using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    public interface IFileService<TFile, TKey>
        where TFile: FileModel<TKey>
    {
        CancellationToken CancellationToken { get; set; }

        Task<TFile> GetAsync(TKey id);
        Task DeleteAsync(TKey id);        
        Task<TFile> UploadAsync(IFormFile file);
    }
}
