using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    public interface IFileService<TFile, TKey>
        where TFile: FileModel<TKey>
    {
        Task<TFile> Get(TKey id);
        Task Delete(TKey id);        
        Task<TFile> Upload(IFormFile file);
    }
}
