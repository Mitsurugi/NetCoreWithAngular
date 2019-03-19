using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    public interface IFileService<TFile, TKey>
        where TFile: FileModel<TKey>
    {
        Task<TFile> GetAsync(TKey id);
        Task DeleteAsync(TKey id);        
        Task<TFile> UploadAsync(IFormFile file);
    }
}
