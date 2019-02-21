namespace CoreLibrary.Identity
{
    public interface IUser<TKey>
        where TKey: System.IEquatable<TKey>
    {
        TKey Id { get; set; }
        string UserName { get; set; }
        string Role { get; set; }
        string RoleDisplayName { get; set; }
    }    
}
