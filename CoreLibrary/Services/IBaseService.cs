using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IBaseService<TEntity, TKey, TGrid, TCreate, TEdit>
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> Get(TKey id);
        Task<TCreate> Create(TCreate create);
        Task<TCreate> Create();        
        Task<TEdit> Edit(TEdit editView);
        Task<TEdit> Edit(TKey id);
        Task Delete(TKey id);
        Task Delete(TKey[] ids);
        Task<int> GetPagesCount(int pageSize);
        Task<List<TGrid>> GetGrid(int pageSize, int pageNumber);
    }
}
