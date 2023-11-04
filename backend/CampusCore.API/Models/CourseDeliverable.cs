namespace CampusCore.API.Models
{
    public class CourseDeliverable
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; } // foreign key from OfferedCourse
        public OfferedCourse OfferedCourse { get; set; } // navigation property
        public int DeliverableId { get; set; } // Foreign key from Deliverable
        public Deliverable Deliverable { get; set; } // navigation property
        public DateTime DeliverableDeadline { get; set; }
    }
}
