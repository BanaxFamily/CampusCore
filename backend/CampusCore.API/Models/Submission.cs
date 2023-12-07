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
        public DateTime? DAAdviser { get; set; } = null;//

        public string Title { get; set; }//
        public string Status { get; set; }//
        


        [ForeignKey("UserId")]
        public string SubmitterId { get; set; } // foreign key from UserTable
        public User Submitter { get; set; } // navigation property

        public int? GroupId { get; set; } // foreign key from GroupTable
        public Group Group { get; set; } // Nativation Property

        

        // digital signatures
        public string AdviserSignature { get; set; }
        public string FacultySignature { get; set; }
        public string DeanSignature { get; set; }
        public string PRCSignature { get; set; }



    }
}