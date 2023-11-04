namespace CampusCore.API.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public int CourseDeliverableId { get; set; } // foreign key from CourseTable
        public Course Course { get; set; } // navigation property
        public string Name { get; set; }
        public string Status { get; set; }
        public string DateOpened { get; set; }
        public string DateClosed { get; set; }
        public string UserId { get; set; } // Foriegn Key from UserTable
        public User User { get; set; } // navigatin property
    }
}
