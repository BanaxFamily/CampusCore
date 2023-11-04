using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class StudentGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }

        //foreign links
        public List<User> Members { get; set; }

        //reviewer / adviser

        [ForeignKey("UserId")]
        public string AdviserId { get; set; }
        public User Adviser { get; set; }

    }
}
