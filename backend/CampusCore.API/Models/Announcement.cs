namespace CampusCore.API.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public string UserId { get; set; } // foreign key from UserTable
        public User User { get; set; } // navigation property
        public int OfferedCourseId { get; set; } // foreign key from OfferedCourseTable
        public OfferedCourse OfferedCourse { get; set; } // navigation property
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
