using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CampusCore.API.Models
{
    public class User: IdentityUser
    {
        [Required]
        [MaxLength(60)]
        [MinLength(2)]
        public string FirstName { get; set; }
        [MaxLength(60)]
        [MinLength(2)]
        public string LastName { get; set; }
        public UserStatus Status { get; set; }
    }

    public enum UserStatus
    {
        Active,
        Inactive,
    }
}
