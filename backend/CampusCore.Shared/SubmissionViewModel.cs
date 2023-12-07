

using Microsoft.AspNetCore.Http;

namespace CampusCore.Shared
{
    
        public class FirstSubmissionViewModel
        {
            public int? SubmissionId { get; set; }
            public string Title { get; set; }
            public string? SubmitterId { get; set; } 
            public int? GroupId { get; set; }
            public int OfferedCourseDeliverableId { get; set; }
            public IFormFile File { get; set; }
            public string FileType { get; set; }
        }

        public class AddNewVersionViewModel
        {
            public int SubmissionId { get; set; }
            public IFormFile File { get; set; }
            public string FileType { get; set; }
            public int[] TargetedIssues { get; set;}
        }
        public class SubmissionGetAllViewModel
        {
            public int SubmissionId { get; set; }
            public string Title { get; set; }
            public DateTime? DAFaculty { get; set; }
            public DateTime? DADean { get; set; }
            public DateTime? DAPRC { get; set; } 
            public string SubmittedBy { get; set; }
            public string Authors { get; set; }
            public string Status { get; set; }
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
