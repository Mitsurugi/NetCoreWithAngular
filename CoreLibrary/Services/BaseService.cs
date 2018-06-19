using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace CoreLibrary
{
    public class BaseService<TEntity, TKey, TEntityCreate, TEntityEdit, TEntityGrid> : IBaseService<TEntity, TKey, TEntityCreate, TEntityEdit, TEntityGrid>
        where TEntity : class, IEntity<TKey>, new()
        where TEntityCreate : class, IEntity<TKey>, new()
        where TEntityEdit : class, IEntity<TKey>, new()
        where TEntityGrid : class, IEntity<TKey>, new()
    {
        protected readonly IRepository<TEntity, TKey> _repository;

        protected readonly IMapper _mapper;

        public BaseService(IRepository<TEntity, TKey> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual IQueryable<TEntity> GetQuery()
        {
            return _repository.GetQuery();
        }

        public virtual async Task<TEntity> Get(TKey id)
        {
            return await _repository.Single(id);
        }

        public virtual async Task<TEntityCreate> Create(TEntityCreate createView)
        {
            var create = _mapper.Map<TEntityCreate, TEntity>(createView);

            create = await _repository.Add(create);
            await _repository.SaveChanges();

            return _mapper.Map<TEntity, TEntityCreate>(create);
        }

        public virtual async Task<TEntityCreate> Create()
        {
            return new TEntityCreate();
        }        

        public virtual async Task<TEntityEdit> Edit(TEntityEdit editView)
        {
            var edit = await _repository.Update(_mapper.Map<TEntityEdit, TEntity>(editView));
            await _repository.SaveChanges();
            return _mapper.Map<TEntity, TEntityEdit>(edit);
        }

        public virtual async Task<TEntityEdit> Edit(TKey id)
        {
            var entity = await Get(id);

            var edit = _mapper.Map<TEntity, TEntityEdit>(entity);

            return edit;
        }

        public virtual async Task Delete(TKey id)
        {
            var delete = await Get(id);
            _repository.Delete(delete);
            await _repository.SaveChanges();
        }

        public virtual async Task Delete(TKey[] ids)
        {
            foreach (var id in ids)
            {
                var delete = await Get(id);
                _repository.Delete(delete);
                await _repository.SaveChanges();
            }
        }

        public virtual async Task<List<TEntityGrid>> GetGrid(int pageSize, int pageNumber)
        {
            if (pageNumber < 1)
                throw new Exception($"Wrong pageNumber = {pageNumber}. Must be 1 or greater");
            if (pageSize < 1)
                throw new Exception($"Wrong pageSize = {pageSize}. Must be 1 or greater");

            return await _repository.GetQuery().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ProjectTo<TEntityGrid>().ToListAsync();
        }

        public virtual async Task<int> GetTotalPages(int pageSize)
        {
            var count = await _repository.GetQuery().CountAsync();

            int pages = (int)Math.Floor((double)count / pageSize);

            if ((double)count / pageSize > pages) pages = pages + 1;

            return pages;
        }
    }
}
