using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; } //just allow "open" or "closed"
        public DateTime DateOpened { get; set; }
        public DateTime? DateClosed { get; set; }

      
        public string UserId { get; set; } // Foriegn Key from UserTable
        public User User { get; set; } // navigatin property
    }
}
