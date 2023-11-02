using CampusCore.API;
using CampusCore.API.Models;
using CampusCore.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureIdentity();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


builder.Services.AddDbContext<AppDbContext>(options =>

{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});



builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["AuthSettings:Audience"],
        ValidIssuer = builder.Configuration["AuthSettings:Issuer"],
        RequireExpirationTime = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AuthSettings:Key"])),
        ValidateIssuerSigningKey = true
    };
});



builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICourseService, CourseService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region "creating roles"
// Add your role and permission configuration code here
using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

    var roles = new[] { "Admin", "Dean", "Faculty", "Student", "PRC" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
    




    //seeding admin account
    string username = "admin";
    string password = "AdminPas$123";
    string email = "admin@campuscore.com";
    if (await userManager.FindByNameAsync(username) == null)
    {
        var user = new User();
        user.UserName = username;
        user.Email = email;

        await userManager.CreateAsync(user, password);
        await userManager.AddToRoleAsync(user, "Admin");
    }

}
#endregion



    


// Define the AddPermission method to add custom permissions to a role





    
    //seeding admin account
    string username = "admin";
    string password = "AdminPas$123";
    string email = "admin@campuscore.com";
    if (await userManager.FindByNameAsync(username) == null)
    {
        var user = new User();
        user.UserName = username;
        user.Email = email;

        await userManager.CreateAsync(user, password);
        await userManager.AddToRoleAsync(user, "Admin");
    }

}
#endregion

#region "role permissions"
// Define the AddPermissionsToRole method to add custom permissions to a role
static async void AddPermissionsToRole(string roleName, RoleManager<IdentityRole> roleManager)
{
    // You can define the custom permissions for each role here
    if (roleName == "Admin")
    {
        var adminRole = await roleManager.FindByNameAsync(roleName);
        var adminPermissions = new List<CustomPermission>
        {
            //users (view, create, update, delete)
                    new CustomPermission(adminRole, "users.full"),
                    
                    //user profile settings (update *passowrd*)
                    new CustomPermission(adminRole, "profile.updateOwn"),
                    
                    //course (view, create, update, delete)
                    new CustomPermission(adminRole, "courses.full"),
                    
                    //offered courses (view, create, update, delete)
                    new CustomPermission(adminRole, "offeredCourses.full"),
                    
                    //course enrollment (view, create, update, delete)
                    new CustomPermission(adminRole, "courseEnrollments.full"),
                    
                    //announcement (view,create, update, delete)
                    new CustomPermission(adminRole, "announcements.full"),
                    
                    //announcement comment (view,create, update, delete)
                    new CustomPermission(adminRole, "announcementsComments.full"),
                    
                    //public research repository(view, create)
                    new CustomPermission(adminRole, "researchRepository.full"),
                    
                    //reports(view)
                    new CustomPermission(adminRole, "reports.view"),
        };

        AddPermission(adminPermissions, roleManager, roleName);
    }
    else if (roleName == "Dean")
    {
        var deanRole = await roleManager.FindByNameAsync(roleName);
        var deanPermissions = new List<CustomPermission>
        {
            //user profile settings (update *own*)
                    new CustomPermission(deanRole, "profile.updateOwn"),
                    
                    //course (view)
                    new CustomPermission(deanRole, "courses.view"),
                    
                    //offered courses (view, create, update, delete)
                    new CustomPermission(deanRole, "offeredCourses.full"),
                    //course enrollment (view, create, update, delete)
                    new CustomPermission(deanRole, "courseEnrollments.full"),

                    //submissions (view, update*approve status of submission*)
                    new CustomPermission(deanRole, "submissions.view"),
                    new CustomPermission(deanRole, "submissions.updateApprove"),
                    
                    //Issues (view, create, update, delete)
                    new CustomPermission(deanRole, "issues.full"),
                    
                    //issue comment (view, create)
                    new CustomPermission(deanRole, "issueComment.view"),
                    new CustomPermission(deanRole, "issueComment.create"),
                    
                    //announcement (view,create, update, delete)
                    new CustomPermission(deanRole, "announcements.full"),
                    
                    //announcement comment (view,create, update, delete)
                    new CustomPermission(deanRole, "announcementsComments.full"),
                    
                    //public research repository(view, create)
                    new CustomPermission(deanRole, "researchRepository.full"),
                    //deliverables (view, create, update, delete)
                    new CustomPermission(deanRole, "deliverables.full"),
                    //student groups(view, create, update, delete)
                    new CustomPermission(deanRole, "studentGroups.full"),
                    //reports(view)
                    new CustomPermission(deanRole, "reports.view"),
        };

        AddPermission(deanPermissions, roleManager, roleName);
    }

    else if(roleName == "Faculty")
    {
        var facultyRole = await roleManager.FindByNameAsync(roleName);
        List<CustomPermission> facultyPermission = new List<CustomPermission>
                {
                    //user profile settings (update *own*)
                    new CustomPermission(facultyRole, "profile.updateOwn"),
                    
                    //course (view)
                    new CustomPermission(facultyRole, "courses.view"),
                    
                    //offered courses (view)
                    new CustomPermission(facultyRole, "offeredCourses.view"),
                    //course enrollment (view)
                    new CustomPermission(facultyRole, "courseEnrollments.view"),

                    //submission (view, create, update*approve status of submission*, delete)
                    new CustomPermission(facultyRole, "submissions.full"),
                    new CustomPermission(facultyRole, "submissions.updateApprove"),
                    
                    //Issues (view, create, update, delete)
                    new CustomPermission(facultyRole, "issues.full"),
                    
                    //issue comment (view, create)
                    new CustomPermission(facultyRole, "issueComment.view"),
                    new CustomPermission(facultyRole, "issueComment.create"),
                    
                    //announcement (view,create, update, delete)
                    new CustomPermission(facultyRole, "announcements.full"),
                    
                    //announcement comment (view,create, update, delete)
                    new CustomPermission(facultyRole, "announcementsComments.full"),
                    
                    //public research repository(view, submit)
                    new CustomPermission(facultyRole, "researchRepository.view"),
                    new CustomPermission(facultyRole, "researchRepository.submit"),

                    //deliverables (view, update)
                    new CustomPermission(facultyRole, "deliverables.view"),
                    new CustomPermission(facultyRole, "deliverables.updateDetails"),

                    //student groups(view, create, update, delete)
                    new CustomPermission(facultyRole, "studentGroups.full"),

                    //reports(view)
                    new CustomPermission(facultyRole, "reports.view"),
                };

        AddPermission(facultyPermission, roleManager, roleName);
    }
    else if (roleName == "Student")
    {
        var studentRole = await roleManager.FindByNameAsync(roleName);
        List<CustomPermission> studentPermission = new List<CustomPermission>
                {
                    //user profile settings (update *own*)
                    new CustomPermission(studentRole, "profile.updateOwn"),
                    
                  
                    //offered courses (view)
                    new CustomPermission(studentRole, "offeredCourses.view"),
                    //course enrollment (view, create, update, delete)
                    new CustomPermission(studentRole, "courseEnrollments.view"),

                    //submission (view, create, update, delete)
                    new CustomPermission(studentRole, "submissions.full"),
                    
                    //Issues (view)
                    new CustomPermission(studentRole, "issues.view"),
                    
                    //issue comment (view, create)
                    new CustomPermission(studentRole, "issueComment.view"),
                    new CustomPermission(studentRole, "issueComment.create"),
                    
                    //announcement (view)
                    new CustomPermission(studentRole, "announcements.view"),
                    
                    //announcement comment (view,create, update, delete)
                    new CustomPermission(studentRole, "announcementsComments.full"),
                    
                    //public research repository(view, submit)
                    new CustomPermission(studentRole, "researchRepository.view"),
                    new CustomPermission(studentRole, "researchRepository.submit"),

                    //deliverables (view)
                    new CustomPermission(studentRole, "deliverables.view"),

                    //student groups(view)
                    new CustomPermission(studentRole, "studentGroups.view"),

                    //reports(view)
                    new CustomPermission(studentRole, "reports.view"),
                };

        AddPermission(studentPermission, roleManager, roleName);
    }

    else if (roleName == "PRC")
    {
        var prcRole = await roleManager.FindByNameAsync(roleName);
        List<CustomPermission> prcPermission = new List<CustomPermission>
                {
                    //submissions (update *approve final submission*)
                     new CustomPermission(prcRole, "submissions.updateApprove"),
                    
                    //announcement (view,create, update, delete)
                    new CustomPermission(prcRole, "announcements.full"),

                    //announcement comment (view,create, update, delete)
                    new CustomPermission(prcRole, "announcementsComments.full"),
                    //public research repository(view)
                    new CustomPermission(prcRole, "researchRepository.view"),
                    
                    //student groups(view)
                    new CustomPermission(prcRole, "studentGroups.view"),

                    //reports(view)
                    new CustomPermission(prcRole, "reports.view"),
                };

        AddPermission(prcPermission, roleManager, roleName);
    }


    // Define the AddPermission method to add custom permissions to a role
    static async void AddPermission(List<CustomPermission> customClaims, RoleManager<IdentityRole> roleManager, string roleName)
    {
        var role = await roleManager.FindByNameAsync(roleName);
        if (role != null)
        {
            foreach (var claim in customClaims)
            {
                await roleManager.AddClaimAsync(role, new Claim(CustomClaimTypes.Permission, claim.ClaimValue));
            }
        }
    }
}
static async void AddPermission(List<CustomPermission> customClaims, RoleManager<IdentityRole> roleManager)
{
    foreach (var claim in customClaims)
    {
        await roleManager.AddClaimAsync(claim.Role, new Claim(CustomClaimTypes.Permission, claim.ClaimValue));
    }
}

#endregion



app.UseAuthorization();

// Use CORS middleware
app.UseCors("AllowOrigin");

app.MapControllers();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
