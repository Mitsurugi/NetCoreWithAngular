using CoreLibrary.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Services
{
    public class IdentityService : IdentityServiceBase<Models.User, System.Guid>
    {
        public IdentityService(UserManager<Models.User> userManager, RoleManager<IdentityRole<System.Guid>> roleManager, SignInManager<Models.User> signInManager, IStringLocalizer localizer) : base(userManager, roleManager, signInManager, localizer)
        {
            _audience = "NetCoreWithAngular";
            _issuer = "NetCoreWithAngular";
            _privateKey = "PrivateKey_YouShallNotPass";
        }
    }
}
