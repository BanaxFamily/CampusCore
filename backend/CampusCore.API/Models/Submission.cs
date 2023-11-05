using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace CampusCore.API.Models
{
    public class Submission
    {
        // update 11-04-2023: Will add codes to AppDbContext. didn't proceed because of  slight issue with digital signatures
        public int Id { get; set; }

        public DateTime DateApproved { get; set; }
        public int OfferedCourseId { get; set; } // foreign key from offeredCourseTable
        public OfferedCourse OfferedCourse { get; set; } // navigation property
        public int DeliverableId { get; set; } // foreign key from DeliverableTable
        public Deliverable Deliverable { get; set; } // Navigation Property

        [ForeignKey("UserId")]
        public string SubmitterId { get; set; } // foreign key from UserTable
        public User Submitter { get; set; } // navigation property

        public int StudentGroupId { get; set; } // foreign key from GroupTable
        public Group StudentGroup { get; set; } // Nativation Property

        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature



    }
}