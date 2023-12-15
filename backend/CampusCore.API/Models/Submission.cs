using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace CampusCore.API.Models
{
    public class Submission
    {
        public int Id { get; set; }

        
        public string Title { get; set; }//
        public string Status { get; set; }//
        


        [ForeignKey("UserId")]
        public string SubmitterId { get; set; } // foreign key from UserTable
        public User Submitter { get; set; } // navigation property

        public int? GroupId { get; set; } // foreign key from GroupTable
        public Group Group { get; set; } // Nativation Property

        
    }
}