namespace CampusCore.API.Models
{
    public class AnnouncementComment
    {
        public int Id { get; set; }
        //public int announcement_id { get; set; } // lacking foreign key from AnnouncementTable
        //public int user_id { get; set; } // lacking foreign key from UsersTable
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
