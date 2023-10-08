using CampusCore.API.Models;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;

namespace CampusCore.API
{
    public static class ServicesExtensions
    {
        public static void ConfigureIdentity (this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<User>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredLength = 8;
            });
           
            
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), services);
            builder.AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
        }
    }
}
