﻿using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;

namespace CampusCore.API.Services
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model);
    }
}

public class UserService : IUserService
{
    private UserManager<User> _userManager;
    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model)
    {
        if( model == null)
            throw new NullReferenceException("Register Model is null");

        if (model.Password != model.RePassword)
            return new UserManagerResponse
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
            return new UserManagerResponse
            {
                Message = "User created successfully!",
                IsSuccess = true
            };

        }
        return new UserManagerResponse
        {
            Message = "User is not created",
            IsSuccess = false,
            Errors = result.Errors.Select(e => e.Description)
        };
        
    }
}
