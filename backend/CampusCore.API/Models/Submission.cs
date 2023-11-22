using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace CampusCore.API.Models
{
    public class Submission
    {
        public int Id { get; set; }

        //use these to check if this submission is already approved by faculty, dean or PRC...if null then not approved yet.
        public DateTime? DAFaculty { get; set; } = null;//
        public DateTime? DADean { get; set; } = null;//
        public DateTime? DAPRC { get; set; } = null;//

        public string Title { get; set; }//
        public string Version { get; set; } //set title by getting how many versions are there in a submission then +1
        public string Status { get; set; }//
        public DateTime DateSubmitted { get; set; }
        public string FilePath { get; set; }


        [ForeignKey("UserId")]
        public string SubmitterId { get; set; } // foreign key from UserTable
        public User Submitter { get; set; } // navigation property

        public int? GroupId { get; set; } // foreign key from GroupTable
        public Group Group { get; set; } // Nativation Property

        

        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature



    }
}