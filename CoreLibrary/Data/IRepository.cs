using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IRepository<TEntity, in TKey> : IDisposable
        where TEntity : class, IEntity<TKey>
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> Add(TEntity entity);
        Task AddRange(params TEntity[] entities);
        Task<TEntity> Update(TEntity entity);
        Task ReferenceLoad(TEntity entity, params string[] references);
        Task CollectionLoad(TEntity entity, params string[] collections);
        Task Delete(TEntity entity);
        Task Delete(Expression<Func<TEntity, bool>> predicate);
        Task SaveChanges();
    }
}
