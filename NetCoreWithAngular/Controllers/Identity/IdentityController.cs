﻿using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using CoreLibrary.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NetCoreWithAngular.Controllers
{
    public class IdentityController : IdentityApiControllerBase<Models.User, System.Guid>
    {
        public IdentityController(IIdentityService<Models.User, System.Guid> service) : base(service)
        {
        }

        public override async Task<IActionResult> TokenRequest(LoginModel model)
        {
            var anyRoles = await _service.GetRoles().AnyAsync();
            if (!anyRoles)
            {
                await _service.CreateRoleAsync(new IdentityRole<System.Guid> { Name = "Admin" });
            }
            var anyUsers = _service.GetUsersQuery().Any();
            if (!anyUsers)
            {
                await _service.CreateUserAsync(new Models.User { UserName = "admin", Role = "Admin" }, "11!!qqQQqq");
                var user = await _service.FindUserByNameAsync("admin");
                await _service.AddUserToRoleAsync(user.Id, "Admin");
            }
            return await base.TokenRequest(model);
        }
    }
}
