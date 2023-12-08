using ExpressiveAnnotations.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class IssueAddViewModel
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime DateOpened { get; set; }
        public DateTime? DateClosed { get; set; }
        public string UserId { get; set; } // Foriegn Key from UserTable
        public int SubmissionId { get; set; }

    }

    public class IssueListViewModel
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime DateOpened { get; set; }
        public DateTime? DateClosed { get; set; }
        public string UserId { get; set; } // Foreign Key from UserTable
    }

    public class IssueDeleteModel
    {
        public int Id { get; set; }
        public int SubmissionId { get; set; }
    }

    
    public class IssueGetAllModel
    {
        
        public int SubmissionId { get; set; }
        public string Filter { get; set; } = "open";
    }


    public class CloseIssueViewModel
    {
        public int IssueId { get; set; }

    }
}
