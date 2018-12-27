using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace CoreLibrary
{
    public interface IDependentService<TEntity, TKey, TParentKey, TGrid, TCreate, TEdit, TFilter>
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TCreate : class, IDependentEntity<TKey, TParentKey>, new()
        where TEdit : class, IDependentEntity<TKey, TParentKey>, new()
        where TGrid : class, IDependentEntity<TKey, TParentKey>, new()
        where TFilter: class, new()
    {
        IQueryable<TEntity> GetQuery();
        IQueryable<TEntity> GetQuery(TParentKey parentId);
        Task<TEntity> Get(TKey id);
        Task<TCreate> Create(TCreate create);
        Task<TCreate> Create(TParentKey parentId);
        Task<TEdit> Edit(TEdit editView);
        Task<TEdit> Edit(TKey id);
        Task Delete(TKey id);
        Task Delete(TKey[] ids);
        Task<int> GetPagesCount(int pageSize, TParentKey parentId, TFilter filter);
        Task<List<TGrid>> GetGrid(int pageSize, int pageNumber, TParentKey parentId, TFilter filter);
        Task<TFilter> GetFilter();
        Task<byte[]> ExcelExport(TParentKey parentId, TFilter filter);
        Task<byte[]> ImportTemplate();
        Task Import(TParentKey parentId, Stream file);
    }
}
