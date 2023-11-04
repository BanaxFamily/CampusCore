using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class SubmissionListAddViewModel
    {
        public int Id { get; set; }
        public int VersionId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }
        public DateTime DateApproved { get; set; }
        // public int offered_course_id { get; set; } // lacking foreign key from offeredCourseTable
        // public int deliverable_id { get; set; } // lacking foreign key from DeliverableTable
        // public int user_id { get; set; } // lacking foreign key from UserTable
        // public int group_id { get; set; } // lacking foreign key from GroupTable
        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        public string FilePath { get; set; }
    }
    public class SubmissionListListViewModel
    {
        public int Id { get; set; }
        public int VersionId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }
        public DateTime DateApproved { get; set; }
        // public int offered_course_id { get; set; } // lacking foreign key from offeredCourseTable
        // public int deliverable_id { get; set; } // lacking foreign key from DeliverableTable
        // public int user_id { get; set; } // lacking foreign key from UserTable
        // public int group_id { get; set; } // lacking foreign key from GroupTable
        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        public string FilePath { get; set; }
    }
    public class SubmissionListDeleteViewModel
    {
        public int Id { get; set; }
        public int VersionId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }
        public DateTime DateApproved { get; set; }
        // public int offered_course_id { get; set; } // lacking foreign key from offeredCourseTable
        // public int deliverable_id { get; set; } // lacking foreign key from DeliverableTable
        // public int user_id { get; set; } // lacking foreign key from UserTable
        // public int group_id { get; set; } // lacking foreign key from GroupTable
        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        public string FilePath { get; set; }
    }
    public class SubmissionListUpdateViewModel
    {
        public int Id { get; set; }
        public int VersionId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }
        public DateTime DateApproved { get; set; }
        // public int offered_course_id { get; set; } // lacking foreign key from offeredCourseTable
        // public int deliverable_id { get; set; } // lacking foreign key from DeliverableTable
        // public int user_id { get; set; } // lacking foreign key from UserTable
        // public int group_id { get; set; } // lacking foreign key from GroupTable
        // public varchar faculty_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        // public varchar dean_digital_signature { get; set; } // lacking foreign key from UserTable re: digital signature
        public string FilePath { get; set; }
    }
}
