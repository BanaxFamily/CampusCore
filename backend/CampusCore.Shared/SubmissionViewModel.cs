

using Microsoft.AspNetCore.Http;

namespace CampusCore.Shared
{
    
        public class SubmissionAddViewModel
        {
            public string Title { get; set; }
            public string Status { get; set; } = "Unapproved";
            public string SubmitterId { get; set; } 
            public int? GroupId { get; set; } = null;
            public int ForCourseDeliverable { get; set; }
            public IFormFile? File { get; set; } = null;
        }
        public class SubmissionGetAllViewModel
        {
            public int SubmissionId { get; set; }
            public string Title { get; set; }
            public DateTime? DAFaculty { get; set; } = null;
            public DateTime? DADean { get; set; } = null;
            public DateTime? DAPRC { get; set; } = null;
            public string Submitter { get; set; }
            public string? GroupName { get; set; }
            public string Authors { get; set; }
            public IFormFile File { get; set; }
            public string Version { get; set; }
            public string Status { get; set; }
            public DateTime DateSubmitted { get; set; }
    }
       
        public class SubmissionUpdateViewModel
        {
            public int Id { get; set; }
            public string Title { get; set; }
        }
        public class SubmissionApproveViewModel
        {
            public int Id { get; set; }
            public string Role {  get; set; }
        }
        public class GetSubmissionsByStudentViewModel
        {
            public int CourseDeliverableId { get; set; }
            public string UserId { get; set;}
            public int OfferedCourseId { get; set; }
        }

        public class GetSubmissionsByDeliverableViewModel
        {
            public int CourseDeliverableId { get; set; }
            public int OfferedCourseId { get; set; }
        }


}
