using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Threading;

namespace CoreLibrary
{
    public class BaseRepository<TDbContext, TEntity, TKey> : IRepository<TEntity, TKey>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TKey>
    {
        protected readonly DbSet<TEntity> _dbSet;
        protected readonly TDbContext _dbContext;
        protected IHttpContextAccessor _httpContext;
        protected CancellationToken cancellationToken;

        public CancellationToken CancellationToken { get => cancellationToken; set => cancellationToken = value; }

        public BaseRepository(TDbContext dbContext, IHttpContextAccessor httpContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
            _httpContext = httpContext;
            CancellationToken = httpContext?.HttpContext?.RequestAborted ?? CancellationToken.None;
        }

        public virtual IQueryable<TEntity> GetQueryNoTracking()
        {
            return _dbSet.AsNoTracking();
        }
        public virtual IQueryable<TEntity> GetQueryWithTracking()
        {
            return _dbSet.AsTracking();
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            var entityResult = await _dbSet.AddAsync(entity, CancellationToken);

            return entityResult.Entity;
        }

        public virtual async Task AddRangeAsync(params TEntity[] entities)
        {
            if (entities == null || !entities.Any())
                throw new ArgumentNullException("entities");
            await _dbSet.AddRangeAsync(entities, CancellationToken);
        }        

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            var updateEntity = await _dbSet.AsTracking().SingleAsync(i => i.Id.Equals(entity.Id), CancellationToken);

            _dbContext.Entry(updateEntity).CurrentValues.SetValues(entity);

            return updateEntity;
        }

        public virtual async Task UpdateAsync(Expression<Func<TEntity, bool>> predicate, Action<TEntity> updateFunc)
        {
            await _dbSet.Where(predicate).AsTracking().ForEachAsync(x => updateFunc(x), CancellationToken);
        }

        public virtual async Task DeleteAsync(TKey id)
        {
            await DeleteAsync(i => i.Id.Equals(id));
        }

        public virtual async Task DeleteAsync(Expression<Func<TEntity, bool>> predicate)
        {
            await _dbSet.Where(predicate).AsTracking().ForEachAsync(x => _dbSet.Remove(x), CancellationToken);
        }

        public virtual async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync(CancellationToken);
        }

        public virtual void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_dbContext != null)
                    _dbContext.Dispose();
            }
        }
    }
}
