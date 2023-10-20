namespace CampusCore.API.Models
{
    public class IssueComment
    {
        public int Id { get; set; }
        //public int issue_id { get; set; } // lacking foriegn Key from issueTable
        //public int user_id { get; set; } // lacking foreign key from userTable
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }
    }
}
