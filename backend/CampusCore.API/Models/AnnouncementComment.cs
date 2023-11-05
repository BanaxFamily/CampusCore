namespace CampusCore.API.Models
{
    public class AnnouncementComment
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; } // foreign key from AnnouncementTable
        public Announcement Announcement { get; set; } // navigation property
        public string UserId { get; set; } // foreign key from UsersTable
        public User User { get; set; } // navigation property
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
