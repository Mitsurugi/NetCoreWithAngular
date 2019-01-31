using CoreLibrary.Identity;
using Microsoft.AspNetCore.Identity;

namespace NetCoreWithAngular.Services
{
    public class IdentityService : IdentityServiceBase<IdentityUser>
    {
        public IdentityService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<IdentityUser> signInManager) : base(userManager, roleManager, signInManager)
        {
            _audience = "NetCoreWithAngular";
            _issuer = "NetCoreWithAngular";
            _privateKey = "PrivateKey_YouShallNotPass";
        }
    }
}
