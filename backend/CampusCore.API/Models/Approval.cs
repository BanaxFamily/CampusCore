using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class Approval
    {
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public string ApproverId { get; set; }
        public User Approver { get; set; }
        public string ApproverRole {  get; set; }
        public string Level { get; set; }
        public DateTime ApprovalDate {  get; set; }
        public byte[] digitalSignature { get; set; }

    }
}
