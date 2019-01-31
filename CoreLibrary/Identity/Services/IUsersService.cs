using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public interface IUsersService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TKey : System.IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TCreate : class, IUserViewModel<TKey>, new()
        where TEdit : class, IUserViewModel<TKey>, new()
        where TGrid : class, IUserViewModel<TKey>, new()
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
        Task ResetPassword(TKey userId, string newPassword);
    }
}
