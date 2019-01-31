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
    public class IdentityController : IdentityApiControllerBase<Models.User, System.Guid>
    {
        public IdentityController(IIdentityService<Models.User, System.Guid> service) : base(service)
        {
        }

        public override async Task<IActionResult> GetToken(LoginModel model)
        {
            var anyRoles = _service.GetRoles().Any();
            if (!anyRoles)
            {
                await _service.CreateRole(new IdentityRole<System.Guid> { Name = "Admin" });
            }
            var anyUsers = _service.GetUsersQuery().Any();
            if (!anyUsers)
            {
                await _service.CreateUser(new Models.User { UserName = "admin", Role = "Admin" }, "11!!qqQQqq");
                var user = await _service.FindUserByName("admin");
                await _service.AddUserToRole(user.Id, "Admin");
            }
            return await base.GetToken(model);
        }
    }
}
