using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

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
        where TFilter: class, new()
        where TParentEntity: class, IEntity<TParentKey>, new()
        where TParentView : class, IEntity<TParentKey>, new()
    {
        Task<TEntity> GetAsync(TKey id);
        Task<TCreate> CreateAsync(TCreate create);
        Task<TEdit> EditAsync(TEdit editView);
        Task<TEdit> EditAsync(TKey id);
        Task DeleteAsync(TKey id);
        Task DeleteAsync(TKey[] ids);
        Task<TFilter> GetFilterAsync();
        Task<byte[]> ImportTemplateAsync();

        IQueryable<TEntity> GetQuery(TParentKey parentId);
        Task<TCreate> CreateAsync(TParentKey parentId);
        Task<int> GetPagesCountAsync(int pageSize, TParentKey parentId, TFilter filter, string searchString);
        Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, TParentKey parentId, string orderBy, TFilter filter, string searchString);
        Task<byte[]> ExcelExportAsync(TParentKey parentId, string orderBy, TFilter filter, string searchString);
        Task ImportAsync(TParentKey parentId, Stream file);

        Task<TParentEntity> GetParentAsync(TParentKey parentId);
        Task<TParentView> GetParentViewAsync(TParentKey parentId);
    }
}
