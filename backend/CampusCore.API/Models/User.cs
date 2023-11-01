using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CampusCore.API.Models
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(60)]
        [MinLength(2)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(60)]
        [MinLength(2)]
        public string LastName { get; set; }
        public string Status { get; set; }

        //foreign navigator
        public List<CourseEnrollment> Enrollments { get; set; }

        //student group
        public int? StudentGroupId { get; set; } // Foreign key to StudentGroup
        public StudentGroup StudentGroup { get; set; } // Navigation property to StudentGroup

        //adviser group
        public List<StudentGroup> AdvisoreeGroups { get; set; }
      
        //to add digital signature later. Will research first if it's part of Identity already

        //changes
    }


}
