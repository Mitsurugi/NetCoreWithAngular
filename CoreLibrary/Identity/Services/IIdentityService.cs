using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public interface IIdentityService<TIdentityUser>
        where TIdentityUser : IdentityUser        
    {        
        //Auth

        Task SignOut();
        Task<SignInResult> SignIn(string userName, string password, bool isPersistent = false, bool lockOnFailure = false);
        Task<bool> VerifyPassword(string userName, string password);
        Task<string> GetToken(string userName, string password);

        //Users

        IQueryable<TIdentityUser> GetUsersQuery();        
        Task CreateUser(TIdentityUser user, string password);        
        Task<TIdentityUser> FindUserById(string userId);
        Task<TIdentityUser> FindUserByName(string userName);        
        Task ChangePassword(string userId, string currentPassword, string newPassword);
        Task<string> GeneratePasswordResetToken(string userId);
        Task ResetPasswordWithToken(string userId, string token, string newPassword);
        Task ResetPassword(string userId, string newPassword);        
        Task DeleteUser(string userId);
        Task EditUser(TIdentityUser user);

        //Roles

        IQueryable<IdentityRole> GetRoles();
        Task CreateRole(IdentityRole role);
        Task<bool> RoleExists(string roleName);
        Task AddUserToRole(string userId, string roleName);
        Task RemoveUserFromRole(string userId, string roleName);
        Task<IList<string>> GetRolesForUser(string userId);
        Task<bool> IsUserInRole(string userId, string roleName);
    }
}
