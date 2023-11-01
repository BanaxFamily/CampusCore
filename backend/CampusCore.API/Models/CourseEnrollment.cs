using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class CourseEnrollment
    {
        public int OfferedCourseId { get; set; }
        public OfferedCourse OfferedCourse { get; set; }

        [ForeignKey("UserId")]
        public string StudentId { get; set; }
        public User Student { get; set; }
    }
}
