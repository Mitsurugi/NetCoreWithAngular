using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Linq;


namespace CoreLibrary.Identity
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class IdentityApiControllerBase<TIdentityUser> : Controller
        where TIdentityUser : IdentityUser        
    {
        protected readonly IIdentityService<TIdentityUser> _service;

        public IdentityApiControllerBase(IIdentityService<TIdentityUser> service)
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
                string t = await _service.GetToken(model.Login, model.Password);
                var user = await _service.FindUserByName(model.Login);
                var roles = await _service.GetRolesForUser(user.Id);
                var r = roles.FirstOrDefault();
                return Ok(new { token = t, login = model.Login, role = r });
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
