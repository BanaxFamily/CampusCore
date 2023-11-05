using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface INotificationService
    {
        Task<ResponseManager> CreateNotificationAsync(NotificationAddViewModel model);
        Task<ResponseManager> ViewNotificationListAsync(NotificationListViewModel model); // new method to get notification
        Task<ResponseManager> DeleteNotificationAsync(NotificationDeleteModel model); // New method to delete a notification
        Task<ResponseManager> UpdateNotificationAsync(NotificationUpdateViewModel model);
    }
    public class NotificationService : INotificationService
    {
        private AppDbContext _context;
        public NotificationService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateNotificationAsync(NotificationAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Notification Model is null");


            var notification = new Notification
            {
                UserId = model.UserId,
                Type = model.Type,
                Message = model.Message,
                Date = model.Date,
                IsRead = model.IsRead,

            };


            _context.Notifications.Add(notification);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Notification created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Notification is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding Notification in DB" }
            };





        }

        public async Task<ResponseManager> ViewNotificationListAsync(NotificationListViewModel model)
        {
            string searchNotification = model.SearchNotification;

            if (string.IsNullOrEmpty(model.SearchNotification) || string.IsNullOrWhiteSpace(model.SearchNotification))
            {
                try
                {
                    var result = await _context.Notifications.ToListAsync();

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Notification retrieved successfully",
                        Data = result
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching notifications",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            else
            {
                try
                {

                    var searchResults = await _context.Notifications
                        .Where(oc => EF.Functions.Like(oc.Message, $"%{model.SearchNotification}%"))
                        .ToListAsync();



                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Notification retrieved successfully",
                        Data = searchResults
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching Notification",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }

            // Add a default return statement or throw an exception here.
        }



        public async Task<ResponseManager> DeleteNotificationAsync(NotificationDeleteModel model)
        {
            try
            {
                var notification = await _context.Notifications.FindAsync(model.Id);

                if (notification == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Notification not found",
                        Errors = new List<string> { "Notification with the specified ID does not exist" }
                    };
                }

                _context.Notifications.Remove(notification);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Notification deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Notification deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the notification" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the notification",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateNotificationAsync(NotificationUpdateViewModel model)
        {
            try
            {
                var notification = await _context.Notifications.FindAsync(model.Id);

                if (notification == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Notification not found",
                        Errors = new List<string> { "Notification with the specified ID does not exist" }
                    };
                }

                // Update the notification properties from the model

                notification.UserId = model.UserId;
                notification.Type = model.Type;
                notification.Message = model.Message;
                notification.Date = model.Date;
                notification.IsRead = model.IsRead;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Notification updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Notification update failed",
                        Errors = new List<string> { "Error occurred while updating the Notification" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the Notification",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
