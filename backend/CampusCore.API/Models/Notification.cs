namespace CampusCore.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string UserId { get; set; } // foreign key from UserTable
        public User User { get; set; } // navigation property
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public int IsRead { get; set; }
    }
}
