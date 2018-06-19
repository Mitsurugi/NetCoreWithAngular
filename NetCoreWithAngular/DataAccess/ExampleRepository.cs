using CoreLibrary;

namespace NetCoreWithAngular.DataAccess
{
    public class ExampleRepository<TEntity, TKey> : BaseRepository<ExampleContext, TEntity, TKey>
        where TEntity : class, IEntity<TKey>
    {
        public ExampleRepository(ExampleContext dbContext) : base(dbContext)
        {
        }
    }
}
