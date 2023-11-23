using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class StudentGroup
    {
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public string StudentId { get; set; }
        public User Student { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
