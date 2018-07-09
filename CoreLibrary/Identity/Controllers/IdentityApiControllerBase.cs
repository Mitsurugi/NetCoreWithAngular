using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class IdentityApiControllerBase<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> : Controller
        where TIdentityUser : IdentityUser
        where TIdentityRole : IdentityRole
        where TUserManager : UserManager<TIdentityUser>
        where TRoleManager : RoleManager<TIdentityRole>
        where TSignInManager : SignInManager<TIdentityUser>
    {
        protected readonly IIdentityService<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> _service;

        public IdentityApiControllerBase(IIdentityService<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> service)
        {
            _service = service;
        }        

        [HttpPost]
        public virtual async Task<IActionResult> GetToken(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                string token = await _service.GetToken(model.Login, model.Password);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Authorize]
        public virtual async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _service.FindUserByName(User.Identity.Name);
                await _service.ChangePassword(user.Id, model.CurrentPassword, model.NewPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _service.ResetPasswordWithToken(model.UserId, model.Token, model.NewPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> ResetPasswordRequest(string email)
        {
            throw new NotImplementedException();
        }        
    }
}
