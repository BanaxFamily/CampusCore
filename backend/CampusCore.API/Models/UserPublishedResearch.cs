using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class UserPublishedResearch
    {
        public int Id { get; set; }
        public int ResearchId { get; set; }
        public PublicResearchRepository Research { get; set; }

        [ForeignKey("UserId")]
        public string AuthorId { get; set; }
        public User User { get; set; }

    }
}
