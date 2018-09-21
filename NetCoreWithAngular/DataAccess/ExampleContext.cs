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

        public DbSet<Anime> Animes { get; set; }

        public DbSet<File> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Anime>().HasOne(m => m.Image).WithMany().HasForeignKey(m => m.ImageId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            base.OnModelCreating(builder);
        }
    }
}
