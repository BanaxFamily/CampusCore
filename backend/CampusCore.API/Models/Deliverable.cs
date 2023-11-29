namespace CampusCore.API.Models
{
    public class Deliverable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }
        public bool ForAdviser { get; set; }
        public bool GroupSubmission { get; set; }
    }
}
