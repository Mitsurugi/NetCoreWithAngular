using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public class IdentityServiceBase<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> : IIdentityService<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager>
        where TIdentityUser : IdentityUser
        where TIdentityRole : IdentityRole
        where TUserManager : UserManager<TIdentityUser>
        where TRoleManager : RoleManager<TIdentityRole>
        where TSignInManager : SignInManager<TIdentityUser>
    {
        protected readonly TUserManager _userManager;
        protected readonly TRoleManager _roleManager;
        protected readonly TSignInManager _signInManager;

        public IdentityServiceBase(TUserManager userManager, TRoleManager roleManager, TSignInManager signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        public virtual async Task<SignInResult> SignIn(string userName, string password, bool isPersistent = false, bool lockOnFailure = false)
        {
            return await _signInManager.PasswordSignInAsync(userName, password, isPersistent, lockOnFailure);
        }

        public virtual async Task SignOut()
        {
            await _signInManager.SignOutAsync();
        }

        public virtual async Task<bool> VerifyPassword(string userName, string password)
        {
            var user = await FindUserByName(userName);
            return await _userManager.CheckPasswordAsync(user, password);
        }

        // Users

        public virtual IQueryable<TIdentityUser> GetUsersQuery()
        {
            return _userManager.Users;
        }

        public virtual async Task CreateUser(TIdentityUser user, string password)
        {
            var identityResult = await _userManager.CreateAsync(user, password);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach(var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }                
        }

        public virtual async Task<TIdentityUser> FindUserById(string userId)
        {
            return await _userManager.FindByIdAsync(userId);            
        }

        public virtual async Task<TIdentityUser> FindUserByName(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }        

        public virtual async Task ChangePassword(string userId, string currentPassword, string newPassword)
        {
            var user = await FindUserById(userId);
            var identityResult = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach (var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }
        }

        public virtual async Task<string> GeneratePasswordResetToken(string userId)
        {
            var user = await FindUserById(userId);
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public virtual async Task ResetPasswordWithToken(string userId, string token, string newPassword)
        {
            var user = await FindUserById(userId);
            var identityResult = await _userManager.ResetPasswordAsync(user, token, newPassword);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach (var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }
        }

        public virtual async Task ResetPassword(string userId, string newPassword)
        {
            var token = await GeneratePasswordResetToken(userId);

            await ResetPasswordWithToken(userId, token, newPassword);
        }

        public virtual async Task DeleteUser(string userId)
        {
            var user = await FindUserById(userId);

            var identityResult = await _userManager.DeleteAsync(user);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach (var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }
        }

        //Roles

        public IQueryable<TIdentityRole> GetRoles()
        {
            return _roleManager.Roles;
        }

        public virtual async Task CreateRole(TIdentityRole role)
        {
            var identityResult = await _roleManager.CreateAsync(role);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach (var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }
        }

        public virtual async Task<bool> RoleExists(string roleName)
        {
            return await _roleManager.RoleExistsAsync(roleName);
        }

        public virtual async Task AddUserToRole(string userId, string roleName)
        {
            var user = await FindUserById(userId);

            var identityResult = await _userManager.AddToRoleAsync(user, roleName);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach (var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }
        }

        public virtual async Task RemoveUserFromRole(string userId, string roleName)
        {
            var user = await FindUserById(userId);

            var identityResult = await _userManager.RemoveFromRoleAsync(user, roleName);

            if (!identityResult.Succeeded)
            {
                string errorText = "";
                foreach (var error in identityResult.Errors)
                {
                    errorText = string.IsNullOrEmpty(errorText) ? error.Description : $"; {error.Description}";
                }

                throw new Exception(errorText);
            }
        }

        public virtual async Task<IList<string>> GetRolesForUser(string userId)
        {
            var user = await FindUserById(userId);

            return await _userManager.GetRolesAsync(user);
        }        

        public virtual async Task<bool> IsUserInRole(string userId, string roleName)
        {
            var user = await FindUserById(userId);

            return await _userManager.IsInRoleAsync(user, roleName);
        }
    }
}
