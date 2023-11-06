namespace CampusCore.API.Models
{
    public class CourseDeliverableSubmission
    {
        public int Id { get; set; }
        public int CourseDeliverableId { get; set; }
        public CourseDeliverable CourseDeliverable { get; set; }
        public int SubmissionId { get; set; }
        public Submission Submission { get; set; }
    }
}
