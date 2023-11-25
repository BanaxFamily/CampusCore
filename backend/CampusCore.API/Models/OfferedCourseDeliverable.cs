using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class OfferedCourseDeliverable
    {
        //own properties
        public int Id { get; set; }
        public int DeliverableId { get; set; } // foreign key
        public Deliverable Deliverable {  get; set; } // navigator property
        public DateTime? Deadline { get; set; }
        public int OfferedCourseId { get; set; } // foreign key
        public OfferedCourse OfferedCourse { get; set; } // navigator property
    }
}
