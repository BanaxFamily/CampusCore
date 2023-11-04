namespace CampusCore.API.Models
{
    public class CourseDeliverable
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; }
        //public int DeliverableId { get; set; } // lacking foreign key from DeliverableTable
        public DateTime DeliverableDeadline { get; set; }
    }
}
