namespace CampusCore.API.Models
{
    public class ResearchViewLog
    {
        public int Id { get; set; }
        
        public int ResearchId { get; set; }
        public PublicResearchRepository Research { get; set; }
        public string UserId { get; set; }
        public User User{ get; set; }
        public DateTime Log { get; set; }
    }

    public class ResearchViewLogAddViewModel
    {
        
        public int ResearchId { get; set; }
        public string UserId { get; set; }
    }

    public class ResearchViewLogViewModel
    {

        public string ResearchTitle { get; set; }
        public string FullName { get; set; }
        public DateTime Log { get; set; }
    }
}
