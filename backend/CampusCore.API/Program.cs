using CampusCore.API;
using CampusCore.API.Models;
using CampusCore.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OfficeOpenXml;
using System.Security.Claims;
using System.Security.Cryptography;
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
builder.Services.AddScoped<IPublicResearchRepositoryService, PublicResearchRepositoryService>();
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
    var context = serviceProvider.GetRequiredService<AppDbContext>();

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

    var encryptionKey = context.EncryptionKeys.FirstOrDefault();

    if (encryptionKey == null)
    {
        byte[] key;
        byte[] iv;

        using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
        {
            key = new byte[32]; // 256 bits for AES-256
            iv = new byte[16]; // 128 bits for AES

            rng.GetBytes(key);
            rng.GetBytes(iv);
        }
        

        // Save to the database
        context.EncryptionKeys.Add(new Encryption { Key = key, Iv = iv });
        context.SaveChanges();
    }

}


#endregion


// Set the license context to indicate how you intend to use EPPlus
ExcelPackage.LicenseContext = LicenseContext.NonCommercial;



app.UseDeveloperExceptionPage();
app.UseAuthentication();
app.UseAuthorization();

// Use CORS middleware
app.UseCors("AllowOrigin");

app.MapControllers();

app.UseHttpsRedirection();



app.MapControllers();

app.Run();
