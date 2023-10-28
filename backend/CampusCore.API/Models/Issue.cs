namespace CampusCore.API.Models
{
    public class Issue
    {
        public int Id { get; set; }
        //public int course_deliverable_id { get; set;} // lacking foreign key from CourseTable
        public string Name { get; set; }
        public string Status { get; set; }
        public string DateOpened { get; set; }
        public string DateClosed { get; set; }
        //public int User_Id { get; set; } // lacking Foriegn Key from UserTable
    }
}
