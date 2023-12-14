using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace CampusCore.API.Models
{
    public class User : IdentityUser
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Status { get; set; } = "Active";
        public string Idno { get; set; }

        public string FullName
        {
            get { return $"{FirstName} {LastName}"; }
        }

        //student group
        public int? StudentGroupId { get; set; } // Foreign key to StudentGroup
        public StudentGroup StudentGroup { get; set; } // Navigation property to StudentGroup

        public byte[] EncryptedPrivateKey { get; set; }
    }


}
