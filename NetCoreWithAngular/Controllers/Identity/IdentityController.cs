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
    public class IdentityController : IdentityApiControllerBase<IdentityUser>
    {
        public IdentityController(IIdentityService<IdentityUser> service) : base(service)
        {
        }

        public override async Task<IActionResult> GetToken(LoginModel model)
        {
            var anyRoles = _service.GetRoles().Any();
            if (!anyRoles)
            {
                await _service.CreateRole(new IdentityRole { Name = "Admin" });
            }
            var anyUsers = _service.GetUsersQuery().Any();
            if (!anyUsers)
            {
                await _service.CreateUser(new IdentityUser { UserName = "admin" }, "11!!qqQQqq");
            }
            return await base.GetToken(model);
        }
    }
}
