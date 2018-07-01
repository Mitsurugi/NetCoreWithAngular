using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IBaseService<TEntity, TKey, TEntityCreate, TEntityEdit, TEntityGrid>
        where TEntity : class, IEntity<TKey>, new()
        where TEntityCreate : class, IEntity<TKey>, new()
        where TEntityEdit : class, IEntity<TKey>, new()
        where TEntityGrid : class, IEntity<TKey>, new()
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> Get(TKey id);
        Task<TEntityCreate> Create(TEntityCreate create);
        Task<TEntityCreate> Create();        
        Task<TEntityEdit> Edit(TEntityEdit editView);
        Task<TEntityEdit> Edit(TKey id);
        Task Delete(TKey id);
        Task Delete(TKey[] ids);
        Task<int> GetPagesCount(int pageSize);
        Task<List<TEntityGrid>> GetGrid(int pageSize, int pageNumber);
    }
}
