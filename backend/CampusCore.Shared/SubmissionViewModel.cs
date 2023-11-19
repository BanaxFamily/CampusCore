

namespace CampusCore.Shared
{
    
        public class SubmissionAddViewModel
        {
            public string Title { get; set; }
            public string SubmitterId { get; set; } 
            public int GroupId { get; set; }
            public int ForCourseDeliverable { get; set; }
    }
        public class SubmissionGetAllViewModel
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string ForCourseDeliverable { get; set; }
            public bool ApprovedFaculty { get; set; } =false;
            public bool ApprovedDean { get; set; } = false;
            public bool ApprovedPRC { get; set; } = false;
            public DateTime? DAFaculty { get; set; } = null;
            public DateTime? DADean { get; set; } = null;
            public DateTime? DAPRC { get; set; } = null;
            public string Submitter { get; set; }
            public string GroupName { get; set; }
            public string Authors { get; set; }
        }
       
        public class SubmissionUpdateViewModel
        {
            public int Id { get; set; }
            public string Title { get; set; }
        }
    
}
