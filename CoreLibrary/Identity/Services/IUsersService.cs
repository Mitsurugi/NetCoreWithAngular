using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public interface IUsersService<TEntity, TKey, TViewModel> : IUsersService<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>
        where TKey : System.IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TViewModel : class, IUserViewModel<TKey>, new()
    {

    }

    public interface IUsersService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter>
        where TKey : System.IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TCreate : class, IUserViewModel<TKey>, new()
        where TEdit : class, IUserViewModel<TKey>, new()
        where TGrid : class, IUserViewModel<TKey>, new()
        where TFilter: class, new()
    {
        IQueryable<TEntity> GetQuery();
        Task<TEntity> GetAsync(TKey id);
        Task<TCreate> CreateAsync(TCreate create);
        Task<TCreate> CreateAsync();        
        Task<TEdit> EditAsync(TEdit editView);
        Task<TEdit> EditAsync(TKey id);
        Task DeleteAsync(TKey id);
        Task DeleteAsync(TKey[] ids);
        Task<int> GetPagesCountAsync(int pageSize, TFilter filter, string searchSting);
        Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, string orderBy, TFilter filter, string searchSting);
        Task<TFilter> GetFilterAsync();
        Task<byte[]> ExcelExportAsync(string orderBy, TFilter filter, string searchString);
        Task<byte[]> ImportTemplateAsync();
        Task ImportAsync(Stream file);
        Task ResetPasswordAsync(TKey userId, string newPassword);
    }
}
