using CoreLibrary;
using Microsoft.AspNetCore.Http;

namespace NetCoreWithAngular.DataAccess
{
    public class ExampleRepository<TEntity, TKey> : BaseRepository<ExampleContext, TEntity, TKey>
        where TEntity : class, IEntity<TKey>
    {
        public ExampleRepository(ExampleContext dbContext, IHttpContextAccessor httpContext) : base(dbContext, httpContext)
        {
        }
    }
}
