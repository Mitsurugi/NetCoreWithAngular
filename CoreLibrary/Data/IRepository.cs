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
        Task<TEntity> AddAsync(TEntity entity);
        Task AddRangeAsync(params TEntity[] entities);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task ReferenceLoadAsync(TEntity entity, params string[] references);
        Task CollectionLoadAsync(TEntity entity, params string[] collections);
        Task DeleteAsync(TEntity entity);
        Task DeleteAsync(Expression<Func<TEntity, bool>> predicate);
        Task SaveChangesAsync();
    }
}
