using System.Text.RegularExpressions;

namespace CampusCore.API.Models
{
    public class SubmissionList
    {
        // update 11-04-2023: Will add codes to AppDbContext. didn't proceed because of  slight issue with digital signatures
        public int Id { get; set; }
        public int VersionId{ get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }
        public DateTime DateApproved { get; set; }
        //public int OfferedCourseId { get; set; } // foreign key from offeredCourseTable
        //public OfferedCourse OfferedCourse { get; set; } // navigation property
        //public int DeliverableId { get; set; } // foreign key from DeliverableTable
        //public Deliverable Deliverable { get; set; } // Navigation Property
        //public int UserId { get; set; } // foreign key from UserTable
        //public User User { get; set; } // navigation property
        //public int GroupId { get; set; } // foreign key from GroupTable
        //public Group Group { get; set; } // Nativation Property
        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        public string FilePath { get; set; }


    }
}
