using CoreLibrary.Identity;
using Microsoft.AspNetCore.Identity;

namespace NetCoreWithAngular.Services
{
    public class IdentityService : IdentityServiceBase<Models.User, System.Guid>
    {
        public IdentityService(UserManager<Models.User> userManager, RoleManager<IdentityRole<System.Guid>> roleManager, SignInManager<Models.User> signInManager) : base(userManager, roleManager, signInManager)
        {
            _audience = "NetCoreWithAngular";
            _issuer = "NetCoreWithAngular";
            _privateKey = "PrivateKey_YouShallNotPass";
        }
    }
}
