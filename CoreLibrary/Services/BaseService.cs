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
using Microsoft.Extensions.Localization;

namespace CoreLibrary
{
    public class BaseService<TEntity, TKey, TViewModel> : BaseService<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>, IBaseService<TEntity, TKey, TViewModel>
        where TEntity : class, IEntity<TKey>, new()
        where TViewModel : class, IEntity<TKey>, new()
    {
        public BaseService(IRepository<TEntity, TKey> repository, IMapper mapper, IStringLocalizer localizer) : base(repository, mapper, localizer)
        {
        }
    }

    public class BaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter : class, new()
    {
        protected readonly IRepository<TEntity, TKey> _repository;

        protected readonly IMapper _mapper;

        protected readonly IStringLocalizer _localizer;

        public BaseService(IRepository<TEntity, TKey> repository, IMapper mapper, IStringLocalizer localizer)
        {
            _repository = repository;
            _mapper = mapper;
            _localizer = localizer;
        }

        public virtual IQueryable<TEntity> GetQuery()
        {
            return _repository.GetQueryNoTracking();
        }

        public virtual async Task<TEntity> GetByIdAsync(TKey id)
        {
            return await GetQuery().SingleAsync(i => i.Id.Equals(id));
        }

        public virtual async Task<TCreate> SaveCreateModelAsync(TCreate createView)
        {
            var create = _mapper.Map<TCreate, TEntity>(createView);

            create = await _repository.AddAsync(create);
            await _repository.SaveChangesAsync();

            return await FillCreateModelAsync(_mapper.Map<TEntity, TCreate>(create));
        }

        public virtual async Task<TCreate> GetCreateModelAsync()
        {
            return await FillCreateModelAsync(new TCreate());
        }

        public virtual async Task<TEdit> SaveEditModelAsync(TEdit editView)
        {
            var old = await GetByIdAsync(editView.Id);
            var entity = _mapper.Map<TEdit, TEntity>(editView, old);
            entity = await _repository.UpdateAsync(entity);
            await _repository.SaveChangesAsync();
            return await FillEditModelAsync(_mapper.Map<TEntity, TEdit>(entity));
        }

        public virtual async Task<TEdit> GetEditModelAsync(TKey id)
        {
            var entity = await GetByIdAsync(id);

            return await FillEditModelAsync(_mapper.Map<TEntity, TEdit>(entity));
        }

        public virtual async Task DeleteAsync(TKey id)
        {
            await DeleteAsync(new TKey[] { id });
        }

        public virtual async Task DeleteAsync(TKey[] ids)
        {
            await _repository.DeleteAsync(i => ids.Contains(i.Id));
            await _repository.SaveChangesAsync();
        }

        public virtual async Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, string orderBy, TFilter filter, string searchString)
        {
            if (pageNumber < 1)
                pageNumber = 1;
            if (pageSize < 1)
                pageSize = 1;

            var query = ApplyFilter(GetQuery(), filter);
            query = ApplySorting(query, orderBy);
            query = ApplySearch(query, searchString);

            var grid = await query.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ProjectTo<TGrid>(_mapper.ConfigurationProvider).ToListAsync();
            grid = await FillGridModelAsync(grid);

            return grid;
        }

        public virtual async Task<int> GetPagesCountAsync(int pageSize, TFilter filter, string searchString)
        {
            var query = ApplyFilter(GetQuery(), filter);
            query = ApplySearch(query, searchString);

            var count = await query.CountAsync();

            int pages = (int)Math.Floor((double)count / pageSize);

            if ((double)count / pageSize > pages) pages = pages + 1;

            return pages;
        }

        public virtual async Task<TFilter> GetFilterModelAsync()
        {
            return await FillFilterModelAsync(new TFilter());
        }

        public virtual async Task<byte[]> GetExcelExportAsync(string orderBy, TFilter filter, string searchString)
        {
            var query = ApplyFilter(GetQuery(), filter);
            query = ApplySorting(query, orderBy);
            query = ApplySearch(query, searchString);

            var grid = await query.ProjectTo<TGrid>(_mapper.ConfigurationProvider).ToListAsync();
            grid = await FillGridModelAsync(grid);

            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Export");

            int i = 1;
            ws.Row(i).Style.Font.Bold = true;
            var fields = typeof(TGrid).GetProperties();

            int c = 1;
            foreach (var field in fields)
            {
                var hide = field.GetCustomAttributes(typeof(ExportHideAttribute), false).FirstOrDefault() as ExportHideAttribute;
                if (hide != null) continue;

                var attr = field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault() as DisplayAttribute;
                if (attr != null && !string.IsNullOrEmpty(attr.Name))
                {
                    ws.Row(i).Cell(c).Value = _localizer[attr.Name];
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
                    var hide = field.GetCustomAttributes(typeof(ExportHideAttribute), false).FirstOrDefault() as ExportHideAttribute;
                    if (hide != null) continue;

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

        public virtual async Task<byte[]> GetImportTemplateAsync()
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

                var req = field.GetCustomAttributes(typeof(RequiredAttribute), false).FirstOrDefault() as RequiredAttribute;

                var display = field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault() as DisplayAttribute;
                if (display != null && !string.IsNullOrEmpty(display.Name))
                {
                    ws.Row(i).Cell(c).Value = _localizer[display.Name] + (req == null ? "" : "*");
                }
                else
                {
                    ws.Row(i).Cell(c).Value = field.Name + (req == null ? "" : "*");
                }
                c++;
            }

            ws.Columns().AdjustToContents();
            var ms = new MemoryStream();
            wb.SaveAs(ms);
            return ms.ToArray();
        }

        public virtual async Task ImportAsync(Stream file)
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
                var item = await FillCreateModelAsync(new TCreate());

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
                                throw new Exception(_localizer["FieldRequired"]);
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
                                throw new Exception(_localizer["ValueNotFound"]);
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
                                throw new Exception(_localizer["InvalidValue"]);
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
                                throw new Exception(_localizer["InvalidValue"]);
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
                            name = _localizer[display.Name];
                        }
                        else
                        {
                            name = field.Name;
                        }
                        errors += _localizer["ImportRowError", rowNumber, name, ex.Message] + "; ";
                    }
                }

                items.Add(item);
            }

            if (string.IsNullOrEmpty(errors))
            {
                items.ForEach(async i => await _repository.AddAsync(_mapper.Map<TCreate, TEntity>(i)));
                await _repository.SaveChangesAsync();
            }
            else
            {
                throw new Exception(errors);
            }
        }

        protected virtual IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy))
                return query;

            bool desc = false;
            if (orderBy.EndsWith("_desc"))
            {
                desc = true;
                orderBy = orderBy.Replace("_desc", "");
            }

            if (desc) query = query.OrderByDescending(i => EF.Property<object>(i, orderBy));
            else query = query.OrderBy(i => EF.Property<object>(i, orderBy));

            return query;
        }

        protected virtual IQueryable<TEntity> ApplyFilter(IQueryable<TEntity> query, TFilter filter)
        {
            if (filter == null)
            {
                return query;
            }

            var filterProperties = typeof(TFilter).GetProperties();
            var entityProperties = typeof(TEntity).GetProperties();
            foreach (var prop in filterProperties)
            {
                var value = prop.GetValue(filter);
                if (value == null || !entityProperties.Any(i => i.Name == prop.Name)) continue;
                if (value.Equals(Activator.CreateInstance(prop.PropertyType))) continue;

                var t = prop.PropertyType;
                if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    t = Nullable.GetUnderlyingType(prop.PropertyType);
                }

                if (t.IsPrimitive || t == typeof(DateTime))
                {
                    query = query.Where(i => EF.Property<object>(i, prop.Name).Equals(value));
                    continue;
                }
                if (t == typeof(string))
                {
                    if (string.IsNullOrEmpty((string)value)) continue;
                    query = query.Where(i => EF.Property<string>(i, prop.Name).Contains((string)value, StringComparison.InvariantCultureIgnoreCase));
                }
                if (t.IsEnum)
                {
                    query = query.Where(i => Enum.Equals(EF.Property<object>(i, prop.Name), value));
                    continue;
                }
            }

            return query;
        }

        protected virtual IQueryable<TEntity> ApplySearch(IQueryable<TEntity> query, string searchString)
        {            
            if (string.IsNullOrEmpty(searchString))
            {
                return query;
            }

            searchString = searchString.Trim();

            string[] keyWords = searchString.Split(' ', options: StringSplitOptions.RemoveEmptyEntries);

            var entityProperties = typeof(TEntity).GetProperties();
            foreach (var prop in entityProperties)
            {
                var t = prop.PropertyType;
                if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    t = Nullable.GetUnderlyingType(prop.PropertyType);
                }

                if (t == typeof(string))
                {
                    query = query.Where(i => keyWords.Any(x => EF.Property<string>(i, prop.Name).Contains(x, StringComparison.InvariantCultureIgnoreCase)));
                    continue;
                }
                if (t.IsPrimitive || t == typeof(DateTime))
                {
                    var keyValues = new List<object>();
                    foreach (var w in keyWords)
                    {
                        try
                        {
                            object val = t.GetMethod("Parse", new[] { typeof(string) }).Invoke(null, new object[] { w });
                            keyValues.Add(val);
                        }
                        catch { }
                    }
                    if (keyValues.Any())
                    {
                        query = query.Where(i => keyValues.Any(x => EF.Property<object>(i, prop.Name).Equals(x)));
                    }
                }
                if (t.IsEnum)
                {
                    var keyValues = new List<object>();
                    foreach (var w in keyWords)
                    {
                        try
                        {
                            object val = Enum.Parse(t, w);
                            keyValues.Add(val);
                        }
                        catch { }
                    }
                    if (keyValues.Any())
                    {
                        query = query.Where(i => keyValues.Any(x => Enum.Equals(EF.Property<object>(i, prop.Name), x) ));
                    }
                }
            }

            return query;
        }

        protected virtual async Task<TCreate> FillCreateModelAsync(TCreate model)
        {
            return model;
        }
        protected virtual async Task<TEdit> FillEditModelAsync(TEdit model)
        {
            return model;
        }
        protected virtual async Task<TFilter> FillFilterModelAsync(TFilter model)
        {
            return model;
        }
        protected virtual async Task<List<TGrid>> FillGridModelAsync(List<TGrid> model)
        {
            return model;
        }
    }
}
