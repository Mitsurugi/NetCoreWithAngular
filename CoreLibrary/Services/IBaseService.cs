using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
        where TFilter : class, new()
    {
        CancellationToken CancellationToken { get; set; }
        IQueryable<TEntity> GetQueryNoTracking();
        IQueryable<TEntity> GetQueryWithTracking();
        Task<TCreate> SaveCreateModelAsync(TCreate create);
        Task<TCreate> GetCreateModelAsync();
        Task<TEdit> SaveEditModelAsync(TEdit editView);
        Task<TEdit> GetEditModelAsync(TKey id);
        Task DeleteAsync(TKey id);
        Task DeleteAsync(TKey[] ids);
        Task<int> GetPagesCountAsync(int pageSize, TFilter filter);
        Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, string orderBy, TFilter filter);
        Task<TFilter> GetFilterModelAsync();
        Task<byte[]> GetExcelExportAsync(string orderBy, TFilter filter);
        Task<byte[]> GetImportTemplateAsync();
        Task ImportAsync(Stream file);
    }
}
