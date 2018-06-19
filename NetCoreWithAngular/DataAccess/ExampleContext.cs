using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NetCoreWithAngular.Models;
using Microsoft.AspNetCore.Identity;

namespace NetCoreWithAngular.DataAccess
{
    public class ExampleContext : IdentityDbContext<IdentityUser>
    {
        public ExampleContext(DbContextOptions<ExampleContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
