using CampusCore.API;
using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
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
    options.EnableSensitiveDataLogging();
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
builder.Services.AddScoped<IUserLogService, UserLogService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<ICourseDeliverableService, CourseDeliverableService>();
builder.Services.AddScoped<ICourseEnrollmentService, CourseEnrollmentService>();
builder.Services.AddScoped<IDeliverableServices, DeliverableService>();
builder.Services.AddScoped<IOfferedCourseService, OfferedCourseService>();
builder.Services.AddScoped<IOfferedCourseDeliverableService, OfferedCourseDeliverableService>();
builder.Services.AddScoped<IAnnouncementCommentService, AnnouncementCommentService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IAnnouncementService, AnnouncementService>();
builder.Services.AddScoped<IIssueCommentService, IssueCommentService>();
//builder.Services.AddScoped<IPublicResearchRepositoryService, PublicResearchRepositoryService>();
builder.Services.AddScoped<IIssueService, IssueService>();
builder.Services.AddScoped<ISubmissionService, SubmissionService>();
builder.Services.AddScoped<IVersionService, VersionService>();
builder.Services.AddScoped<IGroupService, GroupService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region "seed"
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

    // Seeding additional users
    string[] usernames = { "Dean", "Faculty", "NeilBasabe", "JenniferAmores", "Student", "MariaTy", "PaulDolloso", "PRC" };
    string[] passwords = { "DeanPas$123", "FacultyPas$123", "FacultyPas$123", "FacultyPas$123", "StudentPas$123", "StudentPas$123", "StudentPas$123", "PrcPas$123" };
    string[] firstNames = { "Dean", "Faculty", "Neil", "Jennnifer", "Student", "Maria", "Paul", "PRC" };
    string[] lastNames = { "Dean", "Faculty", "Basabe", "Amores", "Student", "Obaob", "Dolloso", "PRC" };
    string[] emails = { "dean@campuscore.com", "faculty@campuscore.com", "neilbasabe@campuscore.com", "jenniferamores@campuscore.com", "student@campuscore.com", "mariaty@campuscore.com", "pauldolloso@campuscore.com", "prc@campuscore.com" };
    string[] userRoles = { "Dean", "Faculty", "Faculty", "Faculty", "Student", "Student", "Student", "PRC" };

    //

    for (int i = 0; i < usernames.Length; i++)
    {
        string currentUsername = usernames[i];
        string currentPassword = passwords[i];
        string currentFirstName = firstNames[i];
        string currentLastName = lastNames[i];
        string currentEmail = emails[i];
        string currentUserRole = userRoles[i];

        if (await userManager.FindByNameAsync(currentUsername) == null)
        {
            var user = new User
            {
                UserName = currentUsername,
                Email = currentEmail,
                FirstName = currentFirstName,
                LastName = currentLastName
                // Add other properties as needed
            };

            await userManager.CreateAsync(user, currentPassword);

            // Assign the correct role based on the currentUserRole variable
            if (!await roleManager.RoleExistsAsync(currentUserRole))
            {
                await roleManager.CreateAsync(new IdentityRole(currentUserRole));
            }

            await userManager.AddToRoleAsync(user, currentUserRole);
        }
    }

    // Course seeding
    using (var scopeService = app.Services.CreateScope())
    {
        var serviceProviderService = scopeService.ServiceProvider;
        var courseService = serviceProviderService.GetRequiredService<ICourseService>();
        var dbContext = serviceProviderService.GetRequiredService<AppDbContext>();

        // Define course data
        var coursesData = new List<Course>
    {
        new Course { Name = "Rescom31", Status = "Open", Description = "Research 31" },
        new Course { Name = "Techno32", Status = "Open", Description = "Startup 32" },
        new Course { Name = "Cpstone41", Status = "Close", Description = "Cpstone project 41" }
    };

        foreach (var courseData in coursesData)
        {
            // Check if the course already exists in the database
            if (!dbContext.Courses.Any(c => c.Name == courseData.Name))
            {
                var courseModel = new CourseAddViewModel
                {
                    Name = courseData.Name,
                    Status = courseData.Status,
                    Description = courseData.Description
                };

                var result = await courseService.CreateCourseAsync(courseModel);

                // print message to console whether the seeding is a success or an error 
                if (result.IsSuccess)
                {
                    Console.WriteLine($"Course '{courseData.Name}' seeded successfully!");
                }
                else
                {
                    Console.WriteLine($"Error seeding course '{courseData.Name}': {result.Message}");
                }
            }
            else
            {
                Console.WriteLine($"Course '{courseData.Name}' already exists. Skipping seeding.");
            }
        }
    }


    // Deliverable seeding
    using (var scopeService = app.Services.CreateScope())
    {
        var deliverableServiceProviderService = scopeService.ServiceProvider;
        var deliverableService = deliverableServiceProviderService.GetRequiredService<IDeliverableServices>();
        var dbContext = deliverableServiceProviderService.GetRequiredService<AppDbContext>();

        // Define deliverable data
        var deliverablesData = new List<Deliverable>
    {
        new Deliverable { Name = "research literature", Description = "research literature", Instruction = "research literature", ForAdviser = true, GroupSubmission = true, HighestApprovalNeeded = "Faculty Level" },
        new Deliverable { Name = "Literature Review", Description = "Literature Review", Instruction = "Literature Review", ForAdviser = false, GroupSubmission = true, HighestApprovalNeeded = "Dean Level" },
        new Deliverable { Name = "Business Plan", Description = "Business Plan", Instruction = "Business Plan", ForAdviser = true, GroupSubmission = false, HighestApprovalNeeded = "Faculty Level" },
        new Deliverable { Name = "Feasibility Study", Description = "Feasibility Study", Instruction = "Feasibility Study", ForAdviser = false, GroupSubmission = false, HighestApprovalNeeded = "Faculty Level" },
        new Deliverable { Name = "Project Proposal", Description = "Project Proposal", Instruction = "Project Proposal", ForAdviser = true, GroupSubmission = true, HighestApprovalNeeded = "Dean Level" },
        new Deliverable { Name = "Manuscript", Description = "Manuscript", Instruction = "Project Documentation", ForAdviser = true, GroupSubmission = true, HighestApprovalNeeded = "PRC Level" }
    };

        foreach (var deliverableData in deliverablesData)
        {
            // Check if the deliverable already exists in the database
            if (!dbContext.Deliverables.Any(d => d.Name == deliverableData.Name))
            {
                var deliverableModel = new DeliverableAddViewModel
                {
                    Name = deliverableData.Name,
                    Description = deliverableData.Description,
                    Instruction = deliverableData.Instruction,
                    ForAdviser = deliverableData.ForAdviser,
                    GroupSubmission = deliverableData.GroupSubmission,
                    HighestApprovalNeeded = deliverableData.HighestApprovalNeeded,
                };

                var result = await deliverableService.CreateDeliverableAsync(deliverableModel);

                // print message to console whether the seeding is a success or an error 
                if (result.IsSuccess)
                {
                    Console.WriteLine($"Deliverable '{deliverableData.Name}' seeded successfully!");
                }
                else
                {   
                    Console.WriteLine($"Error seeding deliverable '{deliverableData.Name}': {result.Message}");
                }
            }
            else
            {
                Console.WriteLine($"Deliverable '{deliverableData.Name}' already exists. Skipping seeding.");
            }
        }
    }

    // CourseDeliverable seeding
    using (var scopeService = app.Services.CreateScope())
    {
        var serviceProviderService = scopeService.ServiceProvider;
        var courseDeliverableService = serviceProviderService.GetRequiredService<ICourseDeliverableService>();
        var dbContext = serviceProviderService.GetRequiredService<AppDbContext>();

        // Define courseDeliverable data
        var courseDeliverablesData = new List<CourseDeliverable>
    {
        new CourseDeliverable { CourseId = 1 , DeliverableId = 1},
        new CourseDeliverable {CourseId = 2, DeliverableId = 2},
        new CourseDeliverable {CourseId = 3, DeliverableId = 4},
        new CourseDeliverable {CourseId = 1, DeliverableId = 4},
        new CourseDeliverable {CourseId = 2, DeliverableId = 5},
        new CourseDeliverable {CourseId = 3, DeliverableId = 6},
    };

        foreach (var courseDeliverableData in courseDeliverablesData)
        {
            // Check if the courseDeliverable already exists in the database
            if (!dbContext.CourseDeliverables.Any(c => c.CourseId == courseDeliverableData.CourseId && c.DeliverableId == courseDeliverableData.DeliverableId))
            {
                var courseDeliverableModel = new CourseDeliverableAddViewModel
                {
                    CourseId = courseDeliverableData.CourseId,
                    DeliverableId = courseDeliverableData.DeliverableId,
                };

                var result = await courseDeliverableService.CreateCourseDeliverableAsync(courseDeliverableModel);

                // print message to console whether the seeding is a success or an error 
                if (result.IsSuccess)
                {
                    Console.WriteLine($"Course Deliverable '{courseDeliverableData.CourseId}' seeded successfully!");
                }
                else
                {
                    Console.WriteLine($"Error seeding course deliverable '{courseDeliverableData.CourseId}': {result.Message}");
                }
            }
            else
            {
                Console.WriteLine($"Course deliverable '{courseDeliverableData.CourseId}' already exists. Skipping seeding.");
            }
        }
    }

}
#endregion






app.UseDeveloperExceptionPage();
app.UseAuthentication();
app.UseAuthorization();

// Use CORS middleware
app.UseCors("AllowOrigin");

app.MapControllers();

app.UseHttpsRedirection();



app.MapControllers();

app.Run();
