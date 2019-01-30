using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public interface IIdentityService<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager>
        where TIdentityUser : IdentityUser
        where TIdentityRole : IdentityRole
        where TUserManager : UserManager<TIdentityUser>
        where TRoleManager : RoleManager<TIdentityRole>
        where TSignInManager : SignInManager<TIdentityUser>
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

        IQueryable<TIdentityRole> GetRoles();
        Task CreateRole(TIdentityRole role);
        Task<bool> RoleExists(string roleName);
        Task AddUserToRole(string userId, string roleName);
        Task RemoveUserFromRole(string userId, string roleName);
        Task<IList<string>> GetRolesForUser(string userId);
        Task<bool> IsUserInRole(string userId, string roleName);
    }
}
