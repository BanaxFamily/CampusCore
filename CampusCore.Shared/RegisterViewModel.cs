using System.ComponentModel.DataAnnotations;

namespace CampusCore.Shared
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required]
        [MaxLength(60)]
        [MinLength(8)]
        public string Username { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Password must not be less than 8 characters")]
        [MaxLength(25, ErrorMessage = "Password must not be more than 25 characters")]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Password and Confirmation Password must match.")]
        public string RePassword { get; set; }

        [Required]
        [MaxLength(60)]
        [MinLength(2)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(60)]
        [MinLength(2)]
        public string LastName { get; set; }
        public string Status { get; set; } = UserStatus.Inactive.ToString();

        //to add digital signature later. Will research first if it's part of Identity already
    }

    public enum UserStatus
    {
        Active,
        Inactive,
    }
}
