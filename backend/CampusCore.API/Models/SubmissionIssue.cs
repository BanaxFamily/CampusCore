namespace CampusCore.API.Models
{
    public class SubmissionIssue
    {
        public int Id { get; set; }
        public int SubmissionId { get; set; }
        public Submission Submission { get; set; }
        public int IssueId { get; set; }
        public Issue Issue { get; set; }

    }
}
