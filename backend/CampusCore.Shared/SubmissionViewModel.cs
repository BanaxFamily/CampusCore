

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
    public class DigitalSignatureViewModel
    {
        public string Password { get; set; }
        public string UserId { get; set; }
        public int SubmissionId { get; set; }
        public string Role { get; set; }

    }
    public class AddNewVersionViewModel
    {
        public int SubmissionId { get; set; }
        public IFormFile File { get; set; }
        public string FileType { get; set; }
        public int[] TargetedIssues { get; set; }
    }


    public class SubmissionUpdateViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
    
    public class SubmissionAdviserApproveViewModel
    {
        public int SubmissionId { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
    }

    public class GetSubmissionsByStudentViewModel
    {
        public int OfferedDeliverableId { get; set; }
        public string UserId { get; set; }
    }

    public class GetSubmissionsForFacultyViewModel
    {
        public int OfferedCourseDeliverableId { get; set; }
        public bool IsApproved { get; set; }

        public class GetSubmissionsForDeanViewModel
        {
            public int CourseId { get; set; }
            public bool IsApproved { get; set; }
        }

        public class GetSubmissionsForPRCViewModel
        {
            public bool IsApproved { get; set; }
        }
        public class GetSubmissionsForAdviserViewModel
        {
            public int GroupId { get; set; }
            public string AdviserId { get; set; }
            public bool IsApproved { get; set; }
        }

    }
}
