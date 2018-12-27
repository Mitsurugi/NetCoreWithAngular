namespace CoreLibrary
{
    public interface IEntity<TKey>
    {
        TKey Id { get; set; }
    }    
}
