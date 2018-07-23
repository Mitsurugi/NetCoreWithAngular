using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ClosedXML.Excel;

namespace CoreLibrary
{
    public class BaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter : class, new()
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
            return await GetQuery().SingleAsync(i => i.Id.Equals(id));
        }

        public virtual async Task<TCreate> Create(TCreate createView)
        {
            var create = _mapper.Map<TCreate, TEntity>(createView);

            create = await _repository.Add(create);
            await _repository.SaveChanges();

            return _mapper.Map<TEntity, TCreate>(create);
        }

        public virtual async Task<TCreate> Create()
        {
            return new TCreate();
        }        

        public virtual async Task<TEdit> Edit(TEdit editView)
        {
            var edit = await _repository.Update(_mapper.Map<TEdit, TEntity>(editView));
            await _repository.SaveChanges();
            return _mapper.Map<TEntity, TEdit>(edit);
        }

        public virtual async Task<TEdit> Edit(TKey id)
        {
            var entity = await Get(id);

            var edit = _mapper.Map<TEntity, TEdit>(entity);

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

        public virtual async Task<List<TGrid>> GetGrid(int pageSize, int pageNumber, TFilter filter)
        {
            if (pageNumber < 1)
                throw new Exception($"Wrong pageNumber = {pageNumber}. Must be 1 or greater");
            if (pageSize < 1)
                throw new Exception($"Wrong pageSize = {pageSize}. Must be 1 or greater");

            var query = ApplyFilter(GetQuery(), filter);

            return await query.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ProjectTo<TGrid>().ToListAsync();
        }

        public virtual async Task<int> GetPagesCount(int pageSize, TFilter filter)
        {
            var query = ApplyFilter(GetQuery(), filter);

            var count = await query.CountAsync();

            int pages = (int)Math.Floor((double)count / pageSize);

            if ((double)count / pageSize > pages) pages = pages + 1;

            return pages;
        }

        public virtual async Task<TFilter> GetFilter()
        {
            return new TFilter();
        }

        protected virtual IQueryable<TEntity> ApplyFilter(IQueryable<TEntity> query, TFilter filter)
        {
            return query;
        }

        public virtual async Task<byte[]> ExcelExport(TFilter filter)
        {
            var query = ApplyFilter(GetQuery(), filter);
            var grid = await query.ProjectTo<TGrid>().ToListAsync();

            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Export");

            int i = 1;
            ws.Row(i).Style.Font.Bold = true;
            var fields = typeof(TGrid).GetProperties();

            int c = 1;
            foreach (var field in fields)
            {
                var attr = field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault() as DisplayAttribute;
                if (attr != null && !string.IsNullOrEmpty(attr.Name))
                {
                    ws.Row(i).Cell(c).Value = attr.Name;
                } else
                {
                    ws.Row(i).Cell(c).Value = field.Name;
                }                
                c++;
            }

            i++;
            foreach(var item in grid)
            {
                c = 1;
                foreach (var field in fields)
                {
                    ws.Row(i).Cell(c).Value = typeof(TGrid).GetProperty(field.Name).GetValue(item);
                    c++;
                }
                i++;
            }

            ws.Columns().AdjustToContents();
            var ms = new MemoryStream();
            wb.SaveAs(ms);
            return ms.ToArray();
        }
    }
}
