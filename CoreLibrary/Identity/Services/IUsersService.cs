using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
        where TFilter : class, new()
    {
        CancellationToken CancellationToken { get; set; }
        IQueryable<TEntity> GetQuery();
        Task<TEntity> GetByIdAsync(TKey id);
        Task<TCreate> SaveCreateModelAsync(TCreate create);
        Task<TCreate> GetCreateModelAsync();
        Task<TEdit> SaveEditModelAsync(TEdit editView);
        Task<TEdit> GetEditModelAsync(TKey id);
        Task DeleteAsync(TKey id);
        Task DeleteAsync(TKey[] ids);
        Task<int> GetPagesCountAsync(int pageSize, TFilter filter, string searchSting);
        Task<List<TGrid>> GetGridAsync(int pageSize, int pageNumber, string orderBy, TFilter filter, string searchSting);
        Task<TFilter> GetFilterModelAsync();
        Task<byte[]> GetExcelExportAsync(string orderBy, TFilter filter, string searchString);
        Task<byte[]> GetImportTemplateAsync();
        Task ImportAsync(Stream file);
        Task ResetPasswordAsync(TKey userId, string newPassword);
    }
}
