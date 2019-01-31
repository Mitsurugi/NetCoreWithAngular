using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public interface IIdentityService<TIdentityUser, TKey>
        where TKey: System.IEquatable<TKey>
        where TIdentityUser : IdentityUser<TKey>, IUser<TKey>
    {        
        //Auth

        Task SignOut();
        Task<SignInResult> SignIn(string userName, string password, bool isPersistent = false, bool lockOnFailure = false);
        Task<bool> VerifyPassword(string userName, string password);
        Task<string> GetToken(string userName, string password);

        //Users

        IQueryable<TIdentityUser> GetUsersQuery();        
        Task CreateUser(TIdentityUser user, string password);        
        Task<TIdentityUser> FindUserById(TKey userId);
        Task<TIdentityUser> FindUserByName(string userName);        
        Task ChangePassword(TKey userId, string currentPassword, string newPassword);
        Task<string> GeneratePasswordResetToken(TKey userId);
        Task ResetPasswordWithToken(TKey userId, string token, string newPassword);
        Task ResetPassword(TKey userId, string newPassword);        
        Task DeleteUser(TKey userId);
        Task EditUser(TIdentityUser user);

        //Roles

        IQueryable<IdentityRole<TKey>> GetRoles();
        Task CreateRole(IdentityRole<TKey> role);
        Task<bool> RoleExists(string roleName);
        Task AddUserToRole(TKey userId, string roleName);
        Task RemoveUserFromRole(TKey userId, string roleName);
        Task<IList<string>> GetRolesForUser(TKey userId);
        Task<bool> IsUserInRole(TKey userId, string roleName);
    }
}
