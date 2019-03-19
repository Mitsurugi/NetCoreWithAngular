using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Localization;

namespace CoreLibrary.Identity
{
    public class IdentityServiceBase<TIdentityUser, TKey> : IIdentityService<TIdentityUser, TKey>
        where TKey: System.IEquatable<TKey>
        where TIdentityUser : IdentityUser<TKey>, IUser<TKey>
    {
        protected readonly UserManager<TIdentityUser> _userManager;
        protected readonly RoleManager<Role<TKey>> _roleManager;
        protected readonly SignInManager<TIdentityUser> _signInManager;
        protected readonly IStringLocalizer _localizer;

        protected string _privateKey = "";
        protected string _issuer = "";
        protected string _audience = "";
        protected TimeSpan _tokenLifeTime = new TimeSpan(24, 0, 0);

        public IdentityServiceBase(UserManager<TIdentityUser> userManager, RoleManager<Role<TKey>> roleManager, SignInManager<TIdentityUser> signInManager, IStringLocalizer localizer)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _localizer = localizer;
        }

        //Auth

        public virtual async Task<string> GetTokenAsync(string userName, string password)
        {
            var valid = await VerifyPasswordAsync(userName, password);
            if (!valid)
                throw new Exception(_localizer["InvalidLoginPass"]);
            var user = await FindUserByNameAsync(userName);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName));
            var roles = await GetRolesForUserAsync(user.Id);
            if (roles.Any())
            {
                string r = "";
                foreach(var role in roles)
                {
                    r += $"{role}, ";
                }
                r = r.Trim(new char[] { ',', ' ' });
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, r));
            }


            var jwt = new JwtSecurityToken(
                    issuer: _issuer,
                    audience: _audience,
                    notBefore: DateTime.Now,
                    claims: claims,
                    expires: DateTime.Now.Add(_tokenLifeTime),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_privateKey)), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public virtual async Task<SignInResult> SignInAsync(string userName, string password, bool isPersistent = false, bool lockOnFailure = false)
        {
            return await _signInManager.PasswordSignInAsync(userName, password, isPersistent, lockOnFailure);
        }

        public virtual async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public virtual async Task<bool> VerifyPasswordAsync(string userName, string password)
        {
            var user = await FindUserByNameAsync(userName);
            return await _userManager.CheckPasswordAsync(user, password);
        }

        // Users

        public virtual IQueryable<TIdentityUser> GetUsersQuery()
        {
            return _userManager.Users;
        }

        public virtual async Task CreateUserAsync(TIdentityUser user, string password)
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

        public virtual async Task<TIdentityUser> FindUserByIdAsync(TKey userId)
        {
            return await _userManager.FindByIdAsync(userId.ToString());            
        }

        public virtual async Task<TIdentityUser> FindUserByNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }        

        public virtual async Task ChangePasswordAsync(TKey userId, string currentPassword, string newPassword)
        {
            var user = await FindUserByIdAsync(userId);
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

        public virtual async Task<string> GeneratePasswordResetTokenAsync(TKey userId)
        {
            var user = await FindUserByIdAsync(userId);
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public virtual async Task ResetPasswordWithTokenAsync(TKey userId, string token, string newPassword)
        {
            var user = await FindUserByIdAsync(userId);
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

        public virtual async Task ResetPasswordAsync(TKey userId, string newPassword)
        {
            var token = await GeneratePasswordResetTokenAsync(userId);

            await ResetPasswordWithTokenAsync(userId, token, newPassword);
        }

        public virtual async Task DeleteUserAsync(TKey userId)
        {
            var user = await FindUserByIdAsync(userId);

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

        public virtual async Task EditUserAsync(TIdentityUser user)
        {
            var identityResult = await _userManager.UpdateAsync(user);

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

        public virtual IQueryable<Role<TKey>> GetRoles()
        {
            return _roleManager.Roles;
        }

        public virtual async Task CreateRoleAsync(Role<TKey> role)
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

        public virtual async Task<bool> RoleExistsAsync(string roleName)
        {
            return await _roleManager.RoleExistsAsync(roleName);
        }

        public virtual async Task AddUserToRoleAsync(TKey userId, string roleName)
        {
            var user = await FindUserByIdAsync(userId);

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

        public virtual async Task RemoveUserFromRoleAsync(TKey userId, string roleName)
        {
            var user = await FindUserByIdAsync(userId);

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

        public virtual async Task<IList<string>> GetRolesForUserAsync(TKey userId)
        {
            var user = await FindUserByIdAsync(userId);

            return await _userManager.GetRolesAsync(user);
        }        

        public virtual async Task<bool> IsUserInRoleAsync(TKey userId, string roleName)
        {
            var user = await FindUserByIdAsync(userId);

            return await _userManager.IsInRoleAsync(user, roleName);
        }
    }
}
