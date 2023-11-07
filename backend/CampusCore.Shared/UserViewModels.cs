using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExpressiveAnnotations.Attributes;
using static CampusCore.Shared.UserAddViewModel;

namespace CampusCore.Shared
{
    public class UserLoginViewModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(50)]
        public string Username { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(30)]
        public string Password { get; set; }
    }

    public class UserAddViewModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(4)]
        public string Username { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "Password must not be less than 6 characters")]
        [MaxLength(30, ErrorMessage = "Password must not be more than 30 characters")]
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

        [Required]
        public string Role { get; set; }
        
        [RequiredIf("Role != Admin", ErrorMessage = "Enter Id number")]
        [MaxLength(10)]
        [MinLength(8)]
        public string Idno { get; set; }

        //to add digital signature later. Will research first if it's part of Identity already

        public enum UserStatus
        {
            Active,
            Inactive,
            Alumni
        }

        public enum UserType
        {
            Admin,
            Dean,
            Faculty,
            Student,
            PRC
        }
    }

    public class UserListViewModel
    {
        public string SearchKey { get; set; }
    }

    public class UserUpdateViewModel
    {
        [Required]
        public string Id;

        [RequiredIf("Role != Admin", ErrorMessage = "Enter Id number")]
        [MaxLength(10)]
        [MinLength(8, ErrorMessage = "Minimum of 8 characters")]
        public string Idno;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(4)]
        public string Username { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "Password must not be less than 6 characters")]
        [MaxLength(30, ErrorMessage = "Password must not be more than 30 characters")]
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

        [Required]
        public string Role { get; set; }
    }

    public class UserDeleteViewModel
    {
        public  string  Id { get; set; }
    }
    
}
