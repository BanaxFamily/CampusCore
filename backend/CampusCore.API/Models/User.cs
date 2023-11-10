using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CampusCore.API.Models
{
    public class User : IdentityUser
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Status { get; set; }

        public string Idno { get; set; }

        public string FullName
        {
            get { return $"{FirstName} {LastName}"; }
        }

        //student group
        public int? StudentGroupId { get; set; } // Foreign key to StudentGroup
        public StudentGroup StudentGroup { get; set; } // Navigation property to StudentGroup

        
        //to add digital signature later. Will research first if it's part of Identity already
    }


}
