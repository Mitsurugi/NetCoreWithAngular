using CoreLibrary.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace NetCoreAngular.ViewModels
{
    public class UserViewModel : IUserViewModel<System.Guid>
    {
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Phone { get; set; }
        public System.Guid Id { get; set; }
        public List<SelectListItem> RoleList { get; set; }
        public string Password { get; set; }
        public string RoleDisplayName { get; set; }
    }
}
