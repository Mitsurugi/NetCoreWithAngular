using AutoMapper;
using AutoMapper.QueryableExtensions;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CoreLibrary.Identity
{
    public class UsersService<TEntity, TKey, TViewModel> : UsersService<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>, IUsersService<TEntity, TKey, TViewModel>
        where TKey : IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TViewModel : class, IUserViewModel<TKey>, new()
    {
        public UsersService(IIdentityService<TEntity, TKey> identityService, IMapper mapper, IStringLocalizer localizer, IHttpContextAccessor httpContext) : base(identityService, mapper, localizer, httpContext)
        {
        }
    }

    public class UsersService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : IUsersService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TKey : IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TCreate : class, IUserViewModel<TKey>, new()
        where TEdit : class, IUserViewModel<TKey>, new()
        where TGrid : class, IUserViewModel<TKey>, new()
        where TFilter : class, new()
    {
        protected readonly IIdentityService<TEntity, TKey> _identityService;

        protected readonly IMapper _mapper;

        protected readonly IStringLocalizer _localizer;

        protected readonly IHttpContextAccessor _httpContext;

        protected CancellationToken _cancellationToken;

        public virtual CancellationToken CancellationToken { get => _cancellationToken; set => _cancellationToken = value; }

        public UsersService(IIdentityService<TEntity, TKey> identityService, IMapper mapper, IStringLocalizer localizer, IHttpContextAccessor httpContext)
        {
            _identityService = identityService;
            _mapper = mapper;
            _localizer = localizer;
            _httpContext = httpContext;
            _cancellationToken = httpContext?.HttpContext?.RequestAborted ?? CancellationToken.None;
        }

        public virtual IQueryable<TEntity> GetQuery()
        {
            return _identityService.GetUsersQuery();
        }

        public virtual async Task<TEntity> GetByIdAsync(TKey id)
        {
            return await _identityService.FindUserByIdAsync(id);
        }

        public virtual async Task<TCreate> SaveCreateModelAsync(TCreate createView)
        {
            if (!string.IsNullOrEmpty(createView.Role))
            {
                var exists = await _identityService.RoleExistsAsync(createView.Role);
                if (!exists)
                    throw new Exception(_localizer["RoleNotFound", createView.Role]);
            }

            var create = _mapper.Map<TCreate, TEntity>(createView);

            await _identityService.CreateUserAsync(create, createView.Password);

            create = await _identityService.FindUserByNameAsync(create.UserName);

            if (!string.IsNullOrEmpty(createView.Role))
            {
                await _identityService.AddUserToRoleAsync(create.Id, createView.Role);
            }

            createView = _mapper.Map<TEntity, TCreate>(create);

            var list = new List<SelectListItem>();
            list.AddRange(await _identityService.GetRoles().Select(i => new SelectListItem { Text = _localizer[$"Role.{i.Name}"], Value = i.Name, Selected = i.Name == createView.Role }).ToListAsync(_cancellationToken));
            createView.RoleList = list;

            var roleEntity = _identityService.GetRoles().FirstOrDefault(i => i.Name == createView.Role);
            if (roleEntity != null) createView.RoleDisplayName = _localizer[$"Role.{roleEntity.Name}"];

            createView = await FillCreateModelAsync(createView);

            return createView;
        }

        public virtual async Task<TCreate> GetCreateModelAsync()
        {
            var model = new TCreate();

            var list = new List<SelectListItem>();
            list.AddRange(await _identityService.GetRoles().Select(i => new SelectListItem { Text = _localizer[$"Role.{i.Name}"], Value = i.Name }).ToListAsync(_cancellationToken));
            model.RoleList = list;

            model = await FillCreateModelAsync(model);

            return model;
        }

        public virtual async Task<TEdit> SaveEditModelAsync(TEdit editView)
        {
            string newRole = editView.Role.Trim();
            if (!string.IsNullOrEmpty(newRole))
            {
                var exists = await _identityService.RoleExistsAsync(newRole);
                if (!exists)
                    throw new Exception(_localizer["RoleNotFound", newRole]);
            }

            var old = await _identityService.FindUserByIdAsync(editView.Id);
            var entity = _mapper.Map<TEdit, TEntity>(editView, old);
            await _identityService.EditUserAsync(entity);
            entity = await _identityService.FindUserByIdAsync(entity.Id);

            if (old.Role != newRole)
            {
                await _identityService.RemoveUserFromRoleAsync(entity.Id, old.Role);
                if (!string.IsNullOrEmpty(newRole))
                {
                    await _identityService.AddUserToRoleAsync(entity.Id, newRole);
                }
            }

            editView = _mapper.Map<TEntity, TEdit>(entity);

            var list = new List<SelectListItem>();
            list.AddRange(await _identityService.GetRoles().Select(i => new SelectListItem { Text = _localizer[$"Role.{i.Name}"], Value = i.Name, Selected = i.Name == editView.Role }).ToListAsync(_cancellationToken));
            editView.RoleList = list;

            var roleEntity = await _identityService.GetRoles().FirstOrDefaultAsync(i => i.Name == editView.Role, _cancellationToken);
            if (roleEntity != null) editView.RoleDisplayName = _localizer[$"Role.{roleEntity.Name}"];

            editView = await FillEditModelAsync(editView);

            return editView;
        }

        public virtual async Task<TEdit> GetEditModelAsync(TKey id)
        {
            var entity = await GetByIdAsync(id);

            var edit = _mapper.Map<TEntity, TEdit>(entity);

            var list = new List<SelectListItem>();
            list.AddRange(await _identityService.GetRoles().Select(i => new SelectListItem { Text = _localizer[$"Role.{i.Name}"], Value = i.Name }).ToListAsync(_cancellationToken));
            edit.RoleList = list;

            var roleEntity = await _identityService.GetRoles().FirstOrDefaultAsync(i => i.Name == edit.Role, _cancellationToken);
            if (roleEntity != null) edit.RoleDisplayName = _localizer[$"Role.{roleEntity.Name}"];

            edit = await FillEditModelAsync(edit);

            return edit;
        }

        public virtual async Task DeleteAsync(TKey id)
        {
            var delete = await GetByIdAsync(id);
            await _identityService.DeleteUserAsync(delete.Id);
        }

        public virtual async Task DeleteAsync(TKey[] ids)
        {
            foreach (var id in ids)
            {
                await DeleteAsync(id);
            }
        }

        public virtual async Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, string orderBy, TFilter filter)
        {
            if (pageNumber < 1)
                throw new Exception($"Wrong pageNumber = {pageNumber}. Must be 1 or greater");
            if (pageSize < 1)
                throw new Exception($"Wrong pageSize = {pageSize}. Must be 1 or greater");

            var query = ApplyFilter(GetQuery(), filter);
            query = ApplySorting(query, orderBy);

            var grid = await query.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ProjectTo<TGrid>(_mapper.ConfigurationProvider).ToListAsync(_cancellationToken);

            var roles = await _identityService.GetRoles().ToListAsync(_cancellationToken);
            grid.AsParallel().WithCancellation(_cancellationToken).ForAll(x =>
            {
                var roleEntity = roles.FirstOrDefault(i => i.Name == x.Role);
                if (roleEntity != null) x.RoleDisplayName = _localizer[$"Role.{roleEntity.Name}"];
            });

            grid = await FillGridModelAsync(grid);

            return grid;
        }

        public virtual async Task<int> GetPagesCountAsync(int pageSize, TFilter filter)
        {
            var query = ApplyFilter(GetQuery(), filter);

            var count = await query.CountAsync(_cancellationToken);

            int pages = (int)Math.Floor((double)count / pageSize);

            if ((double)count / pageSize > pages) pages = pages + 1;

            return pages;
        }

        public virtual async Task<TFilter> GetFilterModelAsync()
        {
            return await FillFilterModelAsync(new TFilter());
        }

        public virtual async Task<byte[]> GetExcelExportAsync(string orderBy, TFilter filter)
        {
            var query = ApplyFilter(GetQuery(), filter);
            query = ApplySorting(query, orderBy);

            var grid = await query.ProjectTo<TGrid>(_mapper.ConfigurationProvider).ToListAsync(_cancellationToken);

            var roles = await _identityService.GetRoles().ToListAsync(_cancellationToken);
            grid.AsParallel().WithCancellation(_cancellationToken).ForAll(x =>
            {
                var roleEntity = roles.FirstOrDefault(r => r.Name == x.Role);
                if (roleEntity != null) x.RoleDisplayName = _localizer[$"Role.{roleEntity.Name}"];
            });

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

                        item.Role = "";

                        if (field.Name == "Role" && !string.IsNullOrEmpty(strVal))
                        {
                            item.Role = strVal;
                            var exists = await _identityService.RoleExistsAsync(item.Role);
                            if (!exists)
                                throw new Exception(_localizer["RoleNotFound", item.Role]);
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
                items.ForEach(async i =>
                {
                    var entity = _mapper.Map<TCreate, TEntity>(i);
                    await _identityService.CreateUserAsync(entity, i.Password);
                    if (!string.IsNullOrEmpty(i.Role))
                    {
                        var user = await _identityService.FindUserByNameAsync(entity.UserName);
                        await _identityService.AddUserToRoleAsync(user.Id, i.Role);
                    }
                });
            }
            else
            {
                throw new Exception(errors);
            }
        }

        public virtual async Task ResetPasswordAsync(TKey userId, string newPassword)
        {
            await _identityService.ResetPasswordAsync(userId, newPassword);
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
