using CoreLibrary.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;

namespace NetCoreAngular.Services
{
    public class IdentityService : IdentityServiceBase<Models.User, System.Guid>
    {
        public IdentityService(UserManager<Models.User> userManager, RoleManager<IdentityRole<System.Guid>> roleManager, SignInManager<Models.User> signInManager, IStringLocalizer localizer) : base(userManager, roleManager, signInManager, localizer)
        {
            _audience = "NetCoreAngular";
            _issuer = "NetCoreAngular";
            _privateKey = "PrivateKey_YouShallNotPass";
        }
    }
}
