using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string LeaderId { get; set; }

        //offered course foreign key so they can have different groups for different course they take
        public int? OfferedCourseId { get; set; }
        public OfferedCourse OfferedCourse { get; set; }
        
        

        //reviewer / adviser

        [ForeignKey("UserId")]
        public string? AdviserId { get; set; }
        public User? Adviser { get; set; }
    }
}
