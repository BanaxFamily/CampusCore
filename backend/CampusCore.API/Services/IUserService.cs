using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CampusCore.API.Services
{
    public interface IUserService
    {
        Task<ResponseManager> UserAddAsync(UserAddViewModel model);
        Task<ResponseManager> LoginAsync(UserLoginViewModel model);
    }
}

public class UserService : IUserService
{
    private UserManager<User> _userManager;
    private IConfiguration _configuration;
    private RoleManager<IdentityRole> _roleManager;

    public UserService(UserManager<User> userManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _configuration = configuration;
        _roleManager = roleManager;
       
    }
  
      

    
    public  async Task<ResponseManager> LoginAsync(UserLoginViewModel model)
    {
        if (model == null)
            throw new NullReferenceException("Register Model is null");
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
        {
            return new ResponseManager
            {
                Message = "No user found",
                IsSuccess = false
            };
        }
        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        if(!result)
        {
            return new ResponseManager
            {
                Message = "Invalid login",
                IsSuccess = false
            };
        }
        var claims = new[]
        {
            new Claim("Username", model.Username),
            new Claim(ClaimTypes.NameIdentifier,user.Id)

        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));
        var token = new JwtSecurityToken(
            issuer: _configuration["AuthSettings:Issuer"],
            audience: _configuration["AuthSettings:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

        return new LoginResponseManager
        {
            Message = tokenAsString,
            IsSuccess = true,
            ExpireDate = token.ValidTo
        };


    }
    [Authorize(Roles = "Admin")]
    public async Task<ResponseManager> UserAddAsync(UserAddViewModel model)
    {
        if( model == null)
            throw new NullReferenceException("Register Model is null");

        if (model.Password != model.RePassword)
            return new ResponseManager
            {
                Message = "Confirm password does not match the password",
                IsSuccess = false
            };

        var user = new User
        {
            Email = model.Email,
            UserName = model.Username,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Status = model.Status,

        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if(result.Succeeded)
        {
           await  _userManager.AddToRoleAsync(user, model.Role);
                return new ResponseManager
            {
                Message = "User created successfully!",
                IsSuccess = true
            };

        }
        return new ErrorResponseManager
        {
            Message = "User is not created",
            IsSuccess = false,
            Errors = result.Errors.Select(e => e.Description)
        };

        
    }
}
