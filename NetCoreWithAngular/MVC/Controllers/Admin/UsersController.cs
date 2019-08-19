using CoreLibrary.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UsersController : UsersBaseController<User, System.Guid, UserViewModel>
    {
        public UsersController(IUsersService<User, System.Guid, UserViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
