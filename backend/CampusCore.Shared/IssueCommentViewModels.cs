using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class IssueCommentAddViewModel
    {
        public int IssueId { get; set; } // foriegn Key from issueTable
        public string UserId { get; set; } // foreign key from userTable
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }

    }

    public class IssueCommentSearchViewModel
    {

        public string SearchIssueComment { get; set; }
    }

    public class IssueCommentListViewModel
    {
        public int Id { get; set; }
        public int IssueId { get; set; } // foriegn Key from issueTable
        public string UserId { get; set; } // foreign key from userTable
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }

    }

    public class IssueCommentDeleteModel
    {
        public int Id { get; set; }
    }

    public class IssueCommentGetByIdModel
    {
        public int Id { get; set; }
    }


    public class IssueCommentUpdateViewModel
    {
        public int Id { get; set; }
        public int IssueId { get; set; } // foriegn Key from issueTable
        public string UserId { get; set; } // foreign key from userTable
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }

    }
}
