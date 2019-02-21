using Microsoft.AspNetCore.Identity;

namespace CoreLibrary.Identity
{
    public class Role<TKey> : IdentityRole<TKey>
        where TKey: System.IEquatable<TKey>
    {
        public string DisplayName { get; set; }
    }
}
