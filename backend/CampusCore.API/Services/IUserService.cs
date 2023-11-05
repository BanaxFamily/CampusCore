using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CampusCore.API.Services
{
    public interface IUserService
    {
        Task<ResponseManager> UserAddAsync(UserAddViewModel model);
        Task<ResponseManager> UserListSearchAsync(UserListSearchViewModel model);
        Task<ResponseManager> UserListAllAsync();

        Task<ResponseManager> UserUpdateAsync(UserUpdateViewModel model);
        Task<ResponseManager> UserDeleteAsync(UserDeleteViewModel model);
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
        var userRole = await _userManager.GetRolesAsync(user);
        var claims = new[]
        {
            new Claim("Username", model.Username),
            new Claim(ClaimTypes.NameIdentifier,user.Id),
            new Claim(ClaimTypes.Role, userRole.FirstOrDefault())

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
            Token = tokenAsString,
            IsSuccess = true,
            Message = "Successfully logged in"
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

    public async Task<ResponseManager> UserDeleteAsync(UserDeleteViewModel model)
    {
        try
        {
            var deleteUser = await _userManager.FindByIdAsync(model.Id);
            

            if (deleteUser == null)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "Course not found",
                    Errors = new List<string> { "User with the specified ID does not exist" }
                };
            }
            try
            {
                await _userManager.DeleteAsync(deleteUser);
                return new ResponseManager
                {
                    IsSuccess = true,
                    Message = "User deleted successfully"
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the user",
                    Errors = new List<string> { ex.Message }
                };
            }


        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while deleting the user",
                Errors = new List<string> { ex.Message }
            };
        }
    }

    public async Task<ResponseManager> UserListAllAsync()
    {
        try
        {
            var result = new List<UserListViewModel>(); // Adding this model just to have it in a nice list.
            var users = _userManager.Users;
            
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                {
                    result.Add(new UserListViewModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        HashedPassword = user.PasswordHash,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Status = user.Status,
                        Role = string.Join(", ", roles)
                });
                }
            }

            return new DataResponseManager
            {
                IsSuccess = true,
                Message = "Users retrieved successfully",
                Data = result
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while fetching users",
                Errors = new List<string> { ex.Message }
            };
        }
    }

    public async Task<ResponseManager> UserListSearchAsync(UserListSearchViewModel model)
    {
        string searchKey = model.SearchKey;

       
            try
            {

                var searchResults = await _userManager.Users
                    .Where(oc => EF.Functions.Like(oc.FirstName, $"%{model.SearchKey}%") || EF.Functions.Like(oc.LastName, $"%{model.SearchKey}%"))
                    .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Offered courses retrieved successfully",
                    Data = searchResults
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching offered courses",
                    Errors = new List<string> { ex.Message }
                };
            }
        
    }

    public async Task<ResponseManager> UserUpdateAsync(UserUpdateViewModel model)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(model.Id);

            if (user == null)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "Course not found",
                    Errors = new List<string> { "Course with the specified ID does not exist" }
                };
            }

            // Update the user properties from the model
            user.Email = model.Email;
            user.UserName = model.Username;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Status = model.Status;

            // Save changes to the database
            var result = await _userManager.UpdateAsync(user);

            return new ResponseManager
            {
                IsSuccess = true,
                Message = "Course updated successfully"
            };
        }   
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while updating the course",
                Errors = new List<string> { ex.Message }
            };
        }
    }
}
