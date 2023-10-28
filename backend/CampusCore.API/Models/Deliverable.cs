namespace CampusCore.API.Models
{
    public class Deliverable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }

        // to Add another connection linked to Course_Id
        // public string Course_Id { get; set; }
    }
}
