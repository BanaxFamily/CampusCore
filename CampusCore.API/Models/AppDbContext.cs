using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Models
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext (DbContextOptions options) : base(options) { 
        
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .Property(u => u.Status)
                .HasDefaultValue(UserStatus.Inactive) // Set the default value
                .HasConversion<string>(); // Convert enum to string for the database

            // Add other configurations for your ApplicationUser model here
        }
    }
}
