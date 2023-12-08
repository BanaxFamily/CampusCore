using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class SubmissionApproval
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int SubmissionId { get; set; }
        public Submission Submission {  get; set; }
        public int ApprovalId { get; set; }
        public Approval Approval { get; set; }
    }
}
