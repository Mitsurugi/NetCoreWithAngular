using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace CoreLibrary
{
    public interface IDependentService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter, TParentKey, TParentEntity, TParentView>
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TCreate : class, IDependentEntity<TKey, TParentKey>, new()
        where TEdit : class, IDependentEntity<TKey, TParentKey>, new()
        where TGrid : class, IDependentEntity<TKey, TParentKey>, new()
        where TFilter: class, new()
        where TParentEntity: class, IEntity<TParentKey>, new()
        where TParentView : class, IEntity<TParentKey>, new()
    {
        Task<TEntity> Get(TKey id);
        Task<TCreate> Create(TCreate create);
        Task<TEdit> Edit(TEdit editView);
        Task<TEdit> Edit(TKey id);
        Task Delete(TKey id);
        Task Delete(TKey[] ids);
        Task<TFilter> GetFilter();
        Task<byte[]> ImportTemplate();

        IQueryable<TEntity> GetQuery(TParentKey parentId);
        Task<TCreate> Create(TParentKey parentId);
        Task<int> GetPagesCount(int pageSize, TParentKey parentId, TFilter filter, string searchString);
        Task<List<TGrid>> GetGrid(int pageSize, int pageNumber, TParentKey parentId, string orderBy, TFilter filter, string searchString);
        Task<byte[]> ExcelExport(TParentKey parentId, string orderBy, TFilter filter, string searchString);
        Task Import(TParentKey parentId, Stream file);

        Task<TParentEntity> GetParent(TParentKey parentId);
        Task<TParentView> GetParentView(TParentKey parentId);
    }
}
