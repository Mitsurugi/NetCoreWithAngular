namespace CoreLibrary
{
    public interface IDependentEntity<TKey, TParentKey> : IEntity<TKey>
    {
        TParentKey ParentId { get; set; }
    }
}
