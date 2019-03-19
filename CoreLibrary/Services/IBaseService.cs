using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace CoreLibrary
{
    public interface IBaseService<TEntity, TKey, TViewModel> : IBaseService<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>
        where TEntity : class, IEntity<TKey>, new()
        where TViewModel : class, IEntity<TKey>, new()
    {

    }

    public interface IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter: class, new()
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> GetAsync(TKey id);
        Task<TCreate> CreateAsync(TCreate create);
        Task<TCreate> CreateAsync();        
        Task<TEdit> EditAsync(TEdit editView);
        Task<TEdit> EditAsync(TKey id);
        Task DeleteAsync(TKey id);
        Task DeleteAsync(TKey[] ids);
        Task<int> GetPagesCountAsync(int pageSize, TFilter filter, string searchSting);
        Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, string orderBy, TFilter filter, string searchSting);
        Task<TFilter> GetFilterAsync();
        Task<byte[]> ExcelExportAsync(string orderBy, TFilter filter, string searchString);
        Task<byte[]> ImportTemplateAsync();
        Task ImportAsync(Stream file);
    }
}
