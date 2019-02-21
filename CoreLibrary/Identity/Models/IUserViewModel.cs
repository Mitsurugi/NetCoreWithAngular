using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CoreLibrary.Identity
{
    public interface IUserViewModel<TKey> : IUser<TKey>
        where TKey: System.IEquatable<TKey>
    {
        string Password { get; set; }        

        IEnumerable<SelectListItem> RoleList { get; set; }
    }    
}
