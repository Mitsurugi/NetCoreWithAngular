﻿using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace CoreLibrary.Identity
{
    public interface IUserViewModel<TKey> : IUser<TKey>
        where TKey : System.IEquatable<TKey>
    {
        string Password { get; set; }

        string RoleDisplayName { get; set; }

        List<SelectListItem> RoleList { get; set; }
    }
}
