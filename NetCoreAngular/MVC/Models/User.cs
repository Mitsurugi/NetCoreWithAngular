using CoreLibrary.Identity;
using Microsoft.AspNetCore.Identity;

namespace NetCoreAngular.Models
{
    public class User : IdentityUser<System.Guid>, IUser<System.Guid>
    {
        public string Phone { get; set; }
        public string Role { get; set; }
    }
}
