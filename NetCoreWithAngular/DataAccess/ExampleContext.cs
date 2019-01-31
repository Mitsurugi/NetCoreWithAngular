using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NetCoreWithAngular.Models;
using Microsoft.AspNetCore.Identity;

namespace NetCoreWithAngular.DataAccess
{
    public class ExampleContext : IdentityDbContext<User, IdentityRole<System.Guid>, System.Guid>
    {
        public ExampleContext(DbContextOptions<ExampleContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Anime> Animes { get; set; }

        public DbSet<AnimeEpisode> AnimeEpisodes { get; set; }

        public DbSet<File> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Anime>().HasOne(m => m.Image).WithMany().HasForeignKey(m => m.ImageId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Anime>().HasMany(m => m.Episodes).WithOne(m => m.Anime).HasForeignKey(m => m.ParentId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(builder);
        }
    }
}
