﻿using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace CoreLibrary
{
    public interface IBaseService<TEntity, TKey, TViewModel> : IBaseService<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>
        where TEntity : class, IEntity<TKey>, new()
        where TViewModel : class, IEntity<TKey>, new()
    {

    }

    public interface IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter: class, new()
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> Get(TKey id);
        Task<TCreate> Create(TCreate create);
        Task<TCreate> Create();        
        Task<TEdit> Edit(TEdit editView);
        Task<TEdit> Edit(TKey id);
        Task Delete(TKey id);
        Task Delete(TKey[] ids);
        Task<int> GetPagesCount(int pageSize, TFilter filter, string searchSting);
        Task<List<TGrid>> GetGrid(int pageSize, int pageNumber, string orderBy, TFilter filter, string searchSting);
        Task<TFilter> GetFilter();
        Task<byte[]> ExcelExport(string orderBy, TFilter filter, string searchString);
        Task<byte[]> ImportTemplate();
        Task Import(Stream file);
    }
}
