namespace CampusCore.API.Models
{
    public class SubmissionApproval
    {
        public string Id { get; set; }
        public int SubmissionId { get; set; }
        public Submission Submission {  get; set; }
        public int ApprovalId { get; set; }
        public Approval Approval { get; set; }
    }
}
