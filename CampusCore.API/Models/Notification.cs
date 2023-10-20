namespace CampusCore.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        //public int user_id { get; set; } // lacking foreign key from UserTable
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public int IsRead { get; set; }
    }
}
