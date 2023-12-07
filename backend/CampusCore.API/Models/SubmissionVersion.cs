namespace CampusCore.API.Models
{
    public class SubmissionVersion
    {
        public int Id { get; set; } 
        public int SubmissionId { get; set; }
        public Submission Submission { get; set; }
        public int VersionId { get; set; }
        public Version Version { get; set; }
    }
}
