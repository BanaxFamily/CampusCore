namespace CampusCore.API.Models
{
    public class CourseDeliverable
    {
        public int Id { get; set; }
        public int CourseId { get; set; } // foreign key from OfferedCourse
        public Course Course { get; set; } // navigation property
        public int DeliverableId { get; set; } // Foreign key from Deliverable
        public Deliverable Deliverable { get; set; } // navigation property
        public DateTime? DeliverableDeadline { get; set; }
    }
}
