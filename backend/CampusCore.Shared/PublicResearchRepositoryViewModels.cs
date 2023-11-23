using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class PublicResearchRepositoryAddViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
        public int SubmissionId { get; set; } // lacking foreign key from SubmissionTable
        public string FilePath { get; set; }
        public DateTime DateUploaded { get; set; }
        public string Status { get; set; }

    }



    public class PublicResearchRepositoryListViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
        public string FilePath { get; set; }
        public DateTime DateUploaded { get; set; }
        public DateTime? DateApproved { get; set; }
        public string Status { get; set; }
        public int ViewCount { get; set; }

    }

    public class PublicResearchRepositoryApproveViewModel
    {
        public int RequestId { get; set; }
        public string ApprovedBy { get; set; }
    }
}