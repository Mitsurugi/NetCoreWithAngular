using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using CoreLibrary.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace NetCoreWithAngular.Controllers
{
    public class IdentityController : IdentityApiControllerBase<IdentityUser, IdentityRole, UserManager<IdentityUser>, RoleManager<IdentityRole>, SignInManager<IdentityUser>>
    {
        public IdentityController(IIdentityService<IdentityUser, IdentityRole, UserManager<IdentityUser>, RoleManager<IdentityRole>, SignInManager<IdentityUser>> service) : base(service)
        {
        }

        public override Task<IActionResult> GetToken(LoginModel model)
        {
            var anyUsers = _service.GetUsersQuery().Any();
            if (!anyUsers)
            {
                _service.CreateUser(new IdentityUser { UserName = "admin" }, "11!!qqQQqq");
            }
            return base.GetToken(model);
        }
    }
}
