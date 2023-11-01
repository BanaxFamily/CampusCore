using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace CampusCore.API.Models
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserLog> UserLogs { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<OfferedCourse> OfferedCourses { get; set; }
        public DbSet<CourseEnrollment> CourseEnrollments { get; set; }
        public DbSet<StudentGroup> StudentGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            // Configure the relationship between OfferedCourse and Course
            builder.Entity<OfferedCourse>()
                .HasOne(oc => oc.Course)
                .WithMany()
                .HasForeignKey(oc => oc.CourseId).OnDelete(DeleteBehavior.NoAction);

            // Configure the relationship between OfferedCourse and FacultyMember (and Reviewer)
            builder.Entity<OfferedCourse>()
                .HasOne(oc => oc.FacultyAssigned)
                .WithMany()
                .HasForeignKey(oc => oc.FacultyId).OnDelete(DeleteBehavior.NoAction);

            // Configure the many-to-many relationship between OfferedCourse and User through CourseEnrollment
            builder.Entity<CourseEnrollment>()
            .HasKey(ce => new { ce.OfferedCourseId, ce.StudentId }); ;

            builder.Entity<CourseEnrollment>()
                .HasOne(ce => ce.Student)
                .WithMany()
                .HasForeignKey(ce => ce.StudentId);

            builder.Entity<CourseEnrollment>()
                .HasOne(ce => ce.OfferedCourse)
                .WithMany()
                .HasForeignKey(ce => ce.OfferedCourseId);

            builder.Entity<StudentGroup>()
                .HasMany(sg => sg.Members)
                .WithOne(u => u.StudentGroup)
                .HasForeignKey(u => u.StudentGroupId); // Explicitly specify the foreign key for Members
            builder.Entity<StudentGroup>()
                .HasOne(sg => sg.Adviser)
                .WithMany()
                .HasForeignKey(sg => sg.AdviserId);


            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CampusCoreDB;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }
    }
}
