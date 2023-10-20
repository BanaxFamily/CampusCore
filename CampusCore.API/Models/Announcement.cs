namespace CampusCore.API.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        //public int user_id { get; set; } // lacking foreign key from UserTable
        //public int offered_course_id { get; set; } // lacking foreign key from OfferedCourseTable
        public string Title { get; set; }
    }
}
