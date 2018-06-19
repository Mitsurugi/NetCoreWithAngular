using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{    
    public class IdentityControllerBase<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> : Controller
        where TIdentityUser : IdentityUser
        where TIdentityRole : IdentityRole
        where TUserManager : UserManager<TIdentityUser>
        where TRoleManager : RoleManager<TIdentityRole>
        where TSignInManager : SignInManager<TIdentityUser>
    {
        protected readonly IIdentityService<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> _service;

        public IdentityControllerBase(IIdentityService<TIdentityUser, TIdentityRole, TUserManager, TRoleManager, TSignInManager> service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public virtual async Task<IActionResult> SignOut()
        {
            await _service.SignOut();

            return RedirectToAction("SignIn");
        }

        [HttpGet]
        public virtual async Task<IActionResult> SignIn(string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                 if(Url.IsLocalUrl(returnUrl))
                    return Redirect(returnUrl);
                return Redirect("/");
            }                
            return View(new LoginModel());
        }

        [HttpPost]
        public virtual async Task<IActionResult> SignIn(LoginModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);                
            }

            try
            {
                var result = await _service.SignIn(model.Login, model.Password, model.RememberMe);

                if (result.Succeeded)
                {
                    if (Url.IsLocalUrl(returnUrl))
                        return Redirect(returnUrl);
                    else return Redirect("/");
                } else
                {
                    ModelState.AddModelError("Password","Wrong login or password");
                    return View(model);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", e.Message);
                return View(model);
            }
        }

        [HttpGet]
        [Authorize]
        public virtual async Task<IActionResult> ChangePassword()
        {
            return View(new ChangePasswordModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public virtual async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);                
            }

            try
            {
                var user = await _service.FindUserByName(User.Identity.Name);
                await _service.ChangePassword(user.Id, model.CurrentPassword, model.NewPassword);
                await _service.SignOut();
                return RedirectToAction("SignIn");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", e.Message);
                return View(model);
            }
        }

        [HttpGet]
        public virtual async Task<IActionResult> ResetPassword(string userId, string token)
        {
            return View(new ResetPasswordModel() { Token = token, UserId = userId });
        }

        [HttpPost]
        public virtual async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);                
            }
            try
            {
                await _service.ResetPasswordWithToken(model.UserId, model.Token, model.NewPassword);
                return RedirectToAction("SignIn");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", e.Message);
                return View(model);
            }
        }

        [HttpGet]
        public virtual async Task<IActionResult> ResetPasswordRequest()
        {
            return View();
        }

        [HttpPost]
        public virtual async Task<IActionResult> ResetPasswordRequest(string email)
        {
            throw new NotImplementedException();
        }        
    }
}
