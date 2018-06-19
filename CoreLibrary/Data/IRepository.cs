﻿using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public interface IRepository<TEntity, in TKey> : IDisposable
        where TEntity : class, IEntity<TKey>
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> Single(TKey key);
        Task<TEntity> SingleOrDefault(TKey key);
        Task<TEntity> First(TKey key);
        Task<TEntity> FirstOrDefault(TKey key);
        Task<TEntity> Add(TEntity entity);
        Task AddRange(params TEntity[] entities);
        Task<TEntity> Update(TEntity entity);
        Task ReferenceLoad(TEntity entity, params string[] references);
        Task CollectionLoad(TEntity entity, params string[] collections);
        void Delete(TEntity entity);
        Task Delete(Expression<Func<TEntity, bool>> predicate);
        Task SaveChanges();

        Expression<Func<TEntity, bool>> ExpPrimaryKeyEquals(TEntity entity);
        Expression<Func<TEntity, bool>> ExpPrimaryKeyEquals(TKey key);
    }
}
