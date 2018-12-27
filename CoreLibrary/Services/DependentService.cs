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
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CoreLibrary
{
    public class DependentService<TEntity, TKey, TParentKey, TGrid, TCreate, TEdit, TFilter> : IDependentService<TEntity, TKey, TParentKey, TGrid, TCreate, TEdit, TFilter>
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TCreate : class, IDependentEntity<TKey, TParentKey>, new()
        where TEdit : class, IDependentEntity<TKey, TParentKey>, new()
        where TGrid : class, IDependentEntity<TKey, TParentKey>, new()
        where TFilter : class, new()
    {
        protected readonly IRepository<TEntity, TKey> _repository;

        protected readonly IMapper _mapper;

        public DependentService(IRepository<TEntity, TKey> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual IQueryable<TEntity> GetQuery()
        {
            return _repository.GetQuery();
        }

        public virtual IQueryable<TEntity> GetQuery(TParentKey parentId)
        {
            return _repository.GetQuery().Where(i => i.ParentId.Equals(parentId));
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

        public virtual async Task<TCreate> Create(TParentKey parentId)
        {
            var entity = new TCreate();
            entity.ParentId = parentId;
            return entity;
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
            await _repository.Delete(delete);
            await _repository.SaveChanges();
        }

        public virtual async Task Delete(TKey[] ids)
        {
            await _repository.Delete(i => ids.Contains(i.Id));
        }

        public virtual async Task<List<TGrid>> GetGrid(int pageSize, int pageNumber, TParentKey parentId, TFilter filter)
        {
            if (pageNumber < 1)
                throw new Exception($"Wrong pageNumber = {pageNumber}. Must be 1 or greater");
            if (pageSize < 1)
                throw new Exception($"Wrong pageSize = {pageSize}. Must be 1 or greater");

            var query = ApplyFilter(GetQuery(parentId), filter);

            return await query.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ProjectTo<TGrid>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public virtual async Task<int> GetPagesCount(int pageSize, TParentKey parentId, TFilter filter)
        {
            var query = ApplyFilter(GetQuery(parentId), filter);

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

        public virtual async Task<byte[]> ExcelExport(TParentKey parentId, TFilter filter)
        {
            var query = ApplyFilter(GetQuery(parentId), filter);
            var grid = await query.ProjectTo<TGrid>(_mapper.ConfigurationProvider).ToListAsync();

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
                }
                else
                {
                    ws.Row(i).Cell(c).Value = field.Name;
                }
                c++;
            }

            i++;
            foreach (var item in grid)
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

        public virtual async Task<byte[]> ImportTemplate()
        {
            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Import");

            int i = 1;
            ws.Row(i).Style.Font.Bold = true;
            var fields = typeof(TCreate).GetProperties();

            int c = 1;
            foreach (var field in fields)
            {
                var ignore = field.GetCustomAttributes(typeof(ImportIgnoreAttribute), false).FirstOrDefault() as ImportIgnoreAttribute;
                if (ignore != null)
                    continue;

                var display = field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault() as DisplayAttribute;
                if (display != null && !string.IsNullOrEmpty(display.Name))
                {
                    ws.Row(i).Cell(c).Value = display.Name;
                }
                else
                {
                    ws.Row(i).Cell(c).Value = field.Name;
                }
                c++;
            }

            ws.Columns().AdjustToContents();
            var ms = new MemoryStream();
            wb.SaveAs(ms);
            return ms.ToArray();
        }

        public virtual async Task Import(TParentKey parentId, Stream file)
        {
            var workbook = new XLWorkbook(file);
            var rows = workbook.Worksheet(1).RowsUsed().Skip(1);

            var items = new List<TCreate>();
            string errors = "";


            var fields = new List<System.Reflection.PropertyInfo>();
            foreach (var field in typeof(TCreate).GetProperties())
            {
                var ignore = field.GetCustomAttributes(typeof(ImportIgnoreAttribute), false).FirstOrDefault() as ImportIgnoreAttribute;
                if (ignore == null)
                    fields.Add(field);
            }

            int rowNumber = 1;
            foreach (var row in rows)
            {
                rowNumber++;
                var item = new TCreate();
                item.ParentId = parentId;

                int colNumber = 0;
                foreach (var field in fields)
                {
                    colNumber++;
                    var cell = row.Cell(colNumber);                    
                    try
                    {                        
                        string strVal = cell.GetValue<string>().Trim();
                        var req = field.GetCustomAttributes(typeof(RequiredAttribute), false).FirstOrDefault() as RequiredAttribute;                        
                        if (string.IsNullOrEmpty(strVal))
                        {
                            if (req != null)
                            {
                                throw new Exception("Value required");
                            }
                            continue;
                        }

                        var hasList = field.GetCustomAttributes(typeof(HasListAttribute), false).FirstOrDefault() as HasListAttribute;
                        if (hasList != null && !string.IsNullOrEmpty(hasList.ListPropertyName))
                        {
                            var p = typeof(TCreate).GetProperty(hasList.ListPropertyName);
                            if (p == null)
                                throw new Exception($"HasListAttribute('{hasList.ListPropertyName}') invalid list attribute. Model property with name '{hasList.ListPropertyName}' not found");
                            var list = p.GetValue(item) as IEnumerable<SelectListItem>;
                            if (list == null)
                                throw new Exception($"HasListAttribute('{hasList.ListPropertyName}') invalid list attribute. Model property with name '{hasList.ListPropertyName}' is not a 'IEnumerable<SelectListItem>'");

                            var listItem = list.FirstOrDefault(i => i.Text.Equals(strVal, StringComparison.InvariantCultureIgnoreCase));
                            if (listItem == null)
                                throw new Exception($"Not found");
                            strVal = listItem.Value;
                        }

                        var t = field.PropertyType;
                        if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>))
                        {
                            t = Nullable.GetUnderlyingType(field.PropertyType);
                        }

                        if (t == typeof(string))
                        {
                            typeof(TCreate).GetProperty(field.Name).SetValue(item, strVal);
                            continue;
                        }                        
                        if (t.IsPrimitive || t == typeof(DateTime))
                        {
                            try
                            {
                                object val = t.GetMethod("Parse", new[] { typeof(string) }).Invoke(null, new object[] { strVal });
                                typeof(TCreate).GetProperty(field.Name).SetValue(item, val);
                            }
                            catch
                            {
                                throw new Exception($"Invalid value, must be {t.Name}");
                            }
                            continue;
                        }
                        if (t.IsEnum)
                        {
                            try
                            {
                                object val = Enum.Parse(t, strVal);
                                typeof(TCreate).GetProperty(field.Name).SetValue(item, val);
                            }
                            catch
                            {
                                throw new Exception($"Invalid value, must be {t.Name}");
                            }

                            continue;
                        }
                        
                        throw new Exception("Unsopported field type. Check your create model");

                    }
                    catch (Exception ex)
                    {
                        string name = "";
                        var display = field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault() as DisplayAttribute;
                        if (display != null && !string.IsNullOrEmpty(display.Name))
                        {
                            name = display.Name;
                        }
                        else
                        {
                            name = field.Name;
                        }
                        errors += $"Row {rowNumber} column '{name}' - {ex.Message}; ";
                    }                    
                }

                items.Add(item);
            }

            if (string.IsNullOrEmpty(errors))
            {
                items.ForEach(async i => await _repository.Add(_mapper.Map<TCreate, TEntity>(i)));
                await _repository.SaveChanges();
            }
            else
            {
                throw new Exception(errors);
            }
        }
    }
}
