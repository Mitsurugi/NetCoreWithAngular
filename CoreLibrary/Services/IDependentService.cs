using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IDependentService<TEntity, TKey, TViewModel, TParentKey, TParentEntity, TParentView> : IDependentService<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel, TParentKey, TParentEntity, TParentView>
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TViewModel : class, IDependentEntity<TKey, TParentKey>, new()
        where TParentEntity : class, IEntity<TParentKey>, new()
        where TParentView : class, IEntity<TParentKey>, new()
    {

    }

    public interface IDependentService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter, TParentKey, TParentEntity, TParentView>
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TCreate : class, IDependentEntity<TKey, TParentKey>, new()
        where TEdit : class, IDependentEntity<TKey, TParentKey>, new()
        where TGrid : class, IDependentEntity<TKey, TParentKey>, new()
        where TFilter : class, new()
        where TParentEntity : class, IEntity<TParentKey>, new()
        where TParentView : class, IEntity<TParentKey>, new()
    {
        CancellationToken CancellationToken { get; set; }
        Task<TCreate> SaveCreateModelAsync(TCreate create, TParentKey parentId);
        Task<TEdit> SaveEditModelAsync(TEdit editView, TParentKey parentId);

        IQueryable<TEntity> GetQueryNoTracking(TParentKey parentId);
        IQueryable<TEntity> GetQueryWithTracking(TParentKey parentId);
        Task<TCreate> GetCreateModelAsync(TParentKey parentId);
        Task<TEdit> GetEditModelAsync(TKey id, TParentKey parentId);
        Task<int> GetPagesCountAsync(int pageSize, TParentKey parentId, TFilter filter);
        Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, TParentKey parentId, string orderBy, TFilter filter);
        Task<byte[]> GetExcelExportAsync(TParentKey parentId, string orderBy, TFilter filter);
        Task ImportAsync(TParentKey parentId, Stream file);
        Task DeleteAsync(TKey id, TParentKey parentId);
        Task DeleteAsync(TKey[] ids, TParentKey parentId);
        Task<TFilter> GetFilterModelAsync(TParentKey parentId);
        Task<byte[]> GetImportTemplateAsync(TParentKey parentId);

        Task<TParentEntity> GetParentAsync(TParentKey parentId);
        Task<TParentView> GetParentViewAsync(TParentKey parentId);
    }
}
