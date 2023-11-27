namespace CampusCore.API.Models
{
    public class Version
    {
        public int VersionId { get; set; }
        public int VersionNumber { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string FilePath { get; set; }
        public string? TargetedIssues { get; set; }
        public string FileType { get; set; } // File type to be available: PDF (for all documents), Image, MP4 
    }

    public class VersionViewModel
    {
        public int VersionId { get; set; }
        public int VersionNumber { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string FileB64 { get; set; }
        public string FileType { get; set; } // File type to be available: PDF (for all documents), Image, MP4 
        public int[] TargetedIssues { get; set; }
    }

}
