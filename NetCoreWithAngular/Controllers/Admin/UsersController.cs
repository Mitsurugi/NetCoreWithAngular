using CoreLibrary.Identity;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;

namespace NetCoreWithAngular.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UsersController : UsersBaseController<User, System.Guid, UserViewModel, UserViewModel, UserViewModel, UserViewModel>
    {        
        public UsersController(IUsersService<User, System.Guid, UserViewModel, UserViewModel, UserViewModel, UserViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }
}
