namespace CampusCore.API.Models
{
    public class Version
    {
        public int VersionId { get; set; }
        public int VersionNumber { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string FilePath { get; set; }
        public string? TargetedIssues { get; set; }
    }

    public class VersionViewModel
    {
        public int VersionId { get; set; }
        public int VersionNumber { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string FilePath { get; set; }
        public string? TargetedIssues { get; set; }
    }

}
