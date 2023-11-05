namespace CampusCore.API.Models
{
    public class PublicResearchRepository
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
        public int? submissionId { get; set; } // lacking foreign key from SubmissionTable
        public Submission? Submission { get; set; }
        public string FilePath { get; set; }
        public DateTime DateUploaded { get; set;}
        public DateTime DateApproved { get; set;}
        public string Status { get; set;}
        public int ViewCount { get; set; }
    }
}
