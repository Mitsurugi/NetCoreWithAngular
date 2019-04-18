using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public interface IIdentityService<TIdentityUser, TKey>
        where TKey: System.IEquatable<TKey>
        where TIdentityUser : IdentityUser<TKey>, IUser<TKey>
    {        
        //Auth

        Task SignOutAsync();
        Task<SignInResult> SignInAsync(string userName, string password, bool isPersistent = false, bool lockOnFailure = false);
        Task<bool> VerifyPasswordAsync(string userName, string password);
        Task<string> GetTokenAsync(string userName, string password);

        //Users

        IQueryable<TIdentityUser> GetUsersQuery();        
        Task CreateUserAsync(TIdentityUser user, string password);        
        Task<TIdentityUser> FindUserByIdAsync(TKey userId);
        Task<TIdentityUser> FindUserByNameAsync(string userName);        
        Task ChangePasswordAsync(TKey userId, string currentPassword, string newPassword);
        Task<string> GeneratePasswordResetTokenAsync(TKey userId);
        Task ResetPasswordWithTokenAsync(TKey userId, string token, string newPassword);
        Task ResetPasswordAsync(TKey userId, string newPassword);        
        Task DeleteUserAsync(TKey userId);
        Task EditUserAsync(TIdentityUser user);

        //Roles

        IQueryable<IdentityRole<TKey>> GetRoles();
        Task CreateRoleAsync(IdentityRole<TKey> role);
        Task<bool> RoleExistsAsync(string roleName);
        Task AddUserToRoleAsync(TKey userId, string roleName);
        Task RemoveUserFromRoleAsync(TKey userId, string roleName);
        Task<IList<string>> GetRolesForUserAsync(TKey userId);
        Task<bool> IsUserInRoleAsync(TKey userId, string roleName);
    }
}
