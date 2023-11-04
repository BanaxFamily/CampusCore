namespace CampusCore.API.Models
{
    public class IssueComment
    {
        public int Id { get; set; }
        public int IssueId { get; set; } // foriegn Key from issueTable
        public Issue Issue { get; set; }
        public string UserId { get; set; } // foreign key from userTable
        public User User { get; set; }
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }
    }
}
