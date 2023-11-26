namespace CampusCore.API.Models
{
    public class CourseDeliverableSubmission
    {
        public int Id { get; set; }
        public int OfferedCourseDeliverableId { get; set; }
        public OfferedCourseDeliverable OfferedCourseDeliverable { get; set; }
        public int SubmissionId { get; set; }
        public Submission Submission { get; set; }
    }
}
