using CoreLibrary.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using NetCoreAngular.Models;
using NetCoreAngular.ViewModels;

namespace NetCoreAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UsersController : UsersBaseController<User, System.Guid, UserViewModel>
    {
        public UsersController(IUsersService<User, System.Guid, UserViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
