using CoreLibrary;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using CoreLibrary.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace NetCoreWithAngular.Models
{
    public class User : IdentityUser<System.Guid>, IUser<System.Guid>
    {
        public string Phone { get; set; }
        public string Role { get; set; }
        public string RoleDisplayName { get; set; }
    }
}
