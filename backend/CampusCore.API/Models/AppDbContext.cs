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
        public DbSet<CourseDeliverable> CourseDeliverables { get; set; }
        public DbSet<Deliverable> Deliverables { get; set; }
        public DbSet<CourseDeliverableSubmission> CourseDeliverableSubmissions { get; set; }

        public DbSet<Submission> Submissions { get; set; }
        public DbSet<SubmissionVersion> SubmissionVersions { get; set; }
        public DbSet<Version> Versions { get; set; }
        public DbSet<SubmissionIssue> SubmissionIssues { get; set; }
        public DbSet<Issue> Issues { get; set; }
        public DbSet<IssueComment> IssueComments { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnouncementComment> AnnouncementComments { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<PublicResearchRepository> ResearchRepository { get; set; }



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
            //builder.Entity<CourseEnrollment>()
            //.HasKey(ce => new { ce.OfferedCourseId, ce.StudentId }); ;

            builder.Entity<CourseEnrollment>()
                .HasOne(ce => ce.Student)
                .WithMany()
                .HasForeignKey(ce => ce.StudentId);

            builder.Entity<CourseEnrollment>()
                .HasOne(ce => ce.OfferedCourse)
                .WithMany()
                .HasForeignKey(ce => ce.OfferedCourseId);

            builder.Entity<StudentGroup>()
                .HasOne(sg => sg.Student)
                .WithMany()
                .HasForeignKey(u => u.StudentId); 
            builder.Entity<StudentGroup>()
                .HasOne(sg => sg.Group)
                .WithMany()
                .HasForeignKey(u => u.GroupId);
            builder.Entity<Group>()
                .HasOne(sg => sg.Adviser)
                .WithMany()
                .HasForeignKey(sg => sg.AdviserId);
            builder.Entity<Group>()
                .HasOne(sg => sg.OfferedCourse)
                .WithMany()
                .HasForeignKey(sg => sg.OfferedCourseId);
            builder.Entity<CourseDeliverable>()
                .HasOne(cd => cd.Deliverable)
                .WithMany()
                .HasForeignKey(cd => cd.DeliverableId);
            builder.Entity<CourseDeliverable>()
                .HasOne(oc => oc.OfferedCourse)
                .WithMany()
                .HasForeignKey(oc => oc.OfferedCourseId);
            
            
            builder.Entity<Submission>()
                .HasOne(sl => sl.Submitter)
                .WithMany()
                .HasForeignKey(sl => sl.SubmitterId);
            //builder.Entity<SubmissionVersion>()
            //    .HasOne(sl => sl.Submission)
            //    .WithMany()
            //    .HasForeignKey(sl => sl.SubmissionId);
            //builder.Entity<SubmissionVersion>()
            //    .HasOne(sv => sv.Version)
            //    .WithMany()
            //    .HasForeignKey(sv => sv.VersionId);

            //builder.Entity<SubmissionIssue>()
            //    .HasOne(si => si.Submission)
            //    .WithMany()
            //    .HasForeignKey(si => si.SubmissionId)
            //    .OnDelete(DeleteBehavior.Cascade);
            //builder.Entity<SubmissionIssue>()
            //    .HasOne(vi => vi.Version)
            //    .WithMany()
            //    .HasForeignKey(vi => vi.VersionId)
            //    .OnDelete(DeleteBehavior.Cascade);
            //builder.Entity<SubmissionIssue>()
            //    .HasOne(ii => ii.Issue)
            //    .WithMany()
            //    .HasForeignKey(ii => ii.IssueId);
            
            builder.Entity<Issue>()
                .HasOne(i => i.User)
                .WithMany()
                .HasForeignKey(i => i.UserId);
            builder.Entity<IssueComment>()
                .HasOne(ic => ic.Issue)
                .WithMany()
                .HasForeignKey(ic => ic.IssueId);
            builder.Entity<IssueComment>()
                .HasOne(ic => ic.User)
                .WithMany()
                .HasForeignKey(ic => ic.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Announcement>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId);
            builder.Entity<Announcement>()
                .HasOne(a => a.OfferedCourse)
                .WithMany()
                .HasForeignKey(a => a.OfferedCourseId);
            builder.Entity<AnnouncementComment>()
                .HasOne(ac => ac.Announcement)
                .WithMany()
                .HasForeignKey(ac => ac.AnnouncementId);
            builder.Entity<AnnouncementComment>()
                .HasOne(ac => ac.User)
                .WithMany()
                .HasForeignKey(ac => ac.UserId)
                .OnDelete(DeleteBehavior.NoAction); // specify OnDelete behavior
            builder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserId);
            builder.Entity<PublicResearchRepository>()
                .HasOne(prr => prr.Submission)
                .WithMany()
                .HasForeignKey(prr => prr.SubmissionId);



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
