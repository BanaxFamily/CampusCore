using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CampusCore.API.Services
{
    public interface IUserLogService
    {
        Task<ResponseManager> GetAllAsync(); 
        Task<ResponseManager> SearchAsync(StringSearchViewModel model); 
    }

    public class UserLogService : IUserLogService
    {
        private AppDbContext _context;
        private UserManager<User> _userManager;

        public UserLogService(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<ResponseManager> GetAllAsync()
        {
            try
            {
                var result = await _context.UserLogs
                                           .Include( x=> x.User)
                                           .ToListAsync();
                if(result.Count > 0 )
                {
                    var logs = new List<UserlogViewModel>();

                    foreach( var item in result )
                    {
                        var role = _userManager.GetRolesAsync(item.User)
                                                .Result.FirstOrDefault();
                                               

                        logs.Add(new UserlogViewModel
                        {
                            Id = item.Id, 
                            Log = item.Log, 
                            Action = item.Action, 
                            UserId = item.UserId, 
                            Idno = item.User.Idno, 
                            UserName = item.User.UserName, 
                            FullName = item.User.FullName, 
                            Role = role
                        });
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "User logs retrieved successfully",
                        Data = logs
                    };
                }
                return new ResponseManager
                {
                    IsSuccess = true,
                    Message = "No records found"
                };

            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching announcements",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> SearchAsync(StringSearchViewModel model)
        {
            try
            {
                var result = await _context.UserLogs
                                           .Include(x => x.User)
                                           .Where( x => x.User.FullName == model.SearchKey)
                                           .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Announcements retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching announcements",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
    }
}
