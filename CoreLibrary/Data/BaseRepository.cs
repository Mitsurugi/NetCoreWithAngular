using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CoreLibrary
{
    public class BaseRepository<TDbContext, TEntity, TKey> : IRepository<TEntity, TKey>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TKey>
    {
        protected readonly DbSet<TEntity> DbSet;
        protected readonly TDbContext DbContext;

        public BaseRepository(TDbContext dbContext)
        {
            DbContext = dbContext;
            DbSet = DbContext.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> GetQueryNoTracking()
        {
            return DbSet.AsNoTracking();
        }
        public virtual IQueryable<TEntity> GetQueryWithTracking()
        {
            return DbSet.AsTracking();
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            var entityResult = await DbSet.AddAsync(entity);

            return entityResult.Entity;
        }

        public virtual async Task AddRangeAsync(params TEntity[] entities)
        {
            if (entities == null || !entities.Any())
                throw new ArgumentNullException("entities");
            await DbSet.AddRangeAsync(entities);
        }        

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            var updateEntity = await DbSet.AsTracking().SingleAsync(i => i.Id.Equals(entity.Id));

            DbContext.Entry(updateEntity).CurrentValues.SetValues(entity);

            return updateEntity;
        }

        public virtual async Task UpdateAsync(Expression<Func<TEntity, bool>> predicate, Func<TEntity, TEntity> updateFunc)
        {
            await DbSet.Where(predicate).AsTracking().ForEachAsync(x => updateFunc(x));
        }

        public virtual async Task DeleteAsync(TKey id)
        {
            await DeleteAsync(i => i.Id.Equals(id));
        }

        public virtual async Task DeleteAsync(Expression<Func<TEntity, bool>> predicate)
        {
            await DbSet.Where(predicate).AsTracking().ForEachAsync(x => DbSet.Remove(x));
        }

        public virtual async Task SaveChangesAsync()
        {
            await DbContext.SaveChangesAsync();
        }

        public virtual async Task ReferenceLoadAsync(TEntity entity, params Expression<Func<TEntity, object>>[] references)
        {
            foreach (var reference in references)
                await DbContext.Entry(entity).Reference(reference).LoadAsync();
        }

        public virtual async Task CollectionLoadAsync(TEntity entity, params Expression<Func<TEntity, IEnumerable<object>>>[] collections)
        {
            foreach (var collection in collections)
                await DbContext.Entry(entity).Collection(collection).LoadAsync();
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
                if (DbContext != null)
                    DbContext.Dispose();
            }
        }
    }
}
