using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class IdentityApiControllerBase<TIdentityUser, TKey> : Controller
        where TKey : System.IEquatable<TKey>
        where TIdentityUser : IdentityUser<TKey>, IUser<TKey>
    {
        protected readonly IIdentityService<TIdentityUser, TKey> _service;

        public IdentityApiControllerBase(IIdentityService<TIdentityUser, TKey> service)
        {
            _service = service;
        }        

        [HttpPost]
        public virtual async Task<IActionResult> TokenRequest(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                string t = await _service.GetTokenAsync(model.Login, model.Password);
                var user = await _service.FindUserByNameAsync(model.Login);
                return Ok(new { token = t, login = model.Login, role = user.Role });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
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
                var user = await _service.FindUserByNameAsync(User.Identity.Name);
                await _service.ChangePasswordAsync(user.Id, model.CurrentPassword, model.NewPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }       
    }
}
