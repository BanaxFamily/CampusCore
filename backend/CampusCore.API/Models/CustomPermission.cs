using Microsoft.AspNetCore.Identity;

namespace CampusCore.API.Models
{
    public class CustomPermission
    {
        public IdentityRole Role { get; set; }
        public string ClaimValue { get; set; }

        public CustomPermission(IdentityRole role, string claimValue)
        {
            Role = role;
            ClaimValue = claimValue;
        }
    }
}
