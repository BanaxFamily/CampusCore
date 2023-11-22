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
        public DateTime DateApproved { get; set; }
        public string Status { get; set; }
        public int ViewCount { get; set; }

    }

    public class PublicResearchRepositorySearchViewModel
    {

        public string SearchPublicResearchRepository { get; set; }
    }

    public class PublicResearchRepositoryListViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
        public int SubmissionId { get; set; } // lacking foreign key from SubmissionTable
        public string FilePath { get; set; }
        public DateTime DateUploaded { get; set; }
        public DateTime DateApproved { get; set; }
        public string Status { get; set; }
        public int ViewCount { get; set; }

    }

    public class PublicResearchRepositoryDeleteModel
    {
        public int Id { get; set; }
    }

    public class PublicResearchRepositoryGetByIdModel
    {
        public int Id { get; set; }
    }


    public class PublicResearchRepositoryUpdateViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
        public int SubmissionId { get; set; } // lacking foreign key from SubmissionTable
        public string FilePath { get; set; }
        public DateTime DateUploaded { get; set; }
        public DateTime DateApproved { get; set; }
        public string Status { get; set; }
        public int ViewCount { get; set; }

    }
}
