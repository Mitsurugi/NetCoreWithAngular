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
                var user = await _service.FindUserByName(User.Identity.Name);
                await _service.ChangePassword(user.Id, model.CurrentPassword, model.NewPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }       
    }
}
