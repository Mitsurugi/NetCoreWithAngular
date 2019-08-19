using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IRepository<TEntity, in TKey> : IDisposable
        where TEntity : class, IEntity<TKey>
    {
        CancellationToken CancellationToken { get; set; }
        IQueryable<TEntity> GetQueryNoTracking();
        IQueryable<TEntity> GetQueryWithTracking();
        Task<TEntity> AddAsync(TEntity entity);
        Task AddRangeAsync(params TEntity[] entities);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task UpdateAsync(Expression<Func<TEntity, bool>> predicate, Action<TEntity> updateFunc);
        Task DeleteAsync(TKey id);
        Task DeleteAsync(Expression<Func<TEntity, bool>> predicate);
        Task SaveChangesAsync();
    }
}
