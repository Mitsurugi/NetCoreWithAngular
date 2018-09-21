using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    public interface IFileService<TKey>
    {
        Task<FileModel<TKey>> Get(TKey id);
        Task Delete(TKey id);        
        Task<FileModel<TKey>> Upload(IFormFile file);
    }
}
