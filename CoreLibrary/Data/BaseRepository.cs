using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

        private string PrimaryKey { get { return "Id"; } }

        public virtual IQueryable<TEntity> GetQuery()
        {
            return DbSet.AsQueryable();
        }

        public virtual async Task<TEntity> Add(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            var entityResult = await DbSet.AddAsync(entity);

            return entityResult.Entity;
        }

        public virtual async Task AddRange(params TEntity[] entities)
        {
            if (entities == null || !entities.Any())
                throw new ArgumentNullException("entities");
            await DbSet.AddRangeAsync(entities);
        }        

        public virtual async Task<TEntity> Update(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            var updateEntity = await GetQuery().SingleAsync(i => i.Id.Equals(entity.Id));

            DbContext.Entry(updateEntity).CurrentValues.SetValues(entity);

            return updateEntity;
        }

        public virtual async Task ReferenceLoad(TEntity entity, params string[] references)
        {
            foreach (var reference in references)
                await DbContext.Entry(entity).Reference(reference).LoadAsync();
        }

        public virtual async Task CollectionLoad(TEntity entity, params string[] collections)
        {
            foreach (var collection in collections)
                await DbContext.Entry(entity).Collection(collection).LoadAsync();
        }

        public virtual void Delete(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            DbSet.Remove(entity);
        }

        public virtual async Task Delete(Expression<Func<TEntity, bool>> predicate)
        {
            await GetQuery().Where(predicate).ForEachAsync(x => Delete(x));
        }

        public virtual async Task SaveChanges()
        {
            await DbContext.SaveChangesAsync();
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
