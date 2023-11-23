using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IAnnouncementService
    {
        Task<ResponseManager> CreateAnnouncementAsync(AnnouncementAddViewModel model);
        Task<ResponseManager> ViewAnnouncementListAsync(); // new method to get Announcement
        Task<ResponseManager> DeleteAnnouncementAsync(IntIdViewModel model); // New method to delete a Announcement
        Task<ResponseManager> UpdateAnnouncementAsync(AnnouncementUpdateViewModel model);
        //Task<ResponseManager> GetByIdAnnouncementAsync(int id);
        Task<ResponseManager> GetByIdAnnouncementAsync(IntIdViewModel model);

    }

    public class AnnouncementService : IAnnouncementService
    {
        private AppDbContext _context;
        public AnnouncementService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateAnnouncementAsync(AnnouncementAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var announcement = new Announcement
            {
                UserId = model.UserId,
                OfferedCourseId = model. OfferedCourseId,
                Title = model.Title,
                Content = model.Content,
                CreatedAt = model.CreatedAt,

            };


            _context.Announcements.Add(announcement);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Announcement created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Announcement is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding announcement in the Database" }
            };





        }

        public async Task<ResponseManager> ViewAnnouncementListAsync()
        {
            try
            {
                var result = await _context.Announcements
                                            .Include(a => a.User)
                                            .Include(a => a.OfferedCourse)
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

            // Add a default return statement or throw an exception here.
        }

        public async Task<ResponseManager> GetByIdAnnouncementAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.Announcements
                                            .Include(a => a.User)
                                            .Include(a => a.OfferedCourse)
                                            .Where(a => a.Id == model.Id)
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



        public async Task<ResponseManager> DeleteAnnouncementAsync(IntIdViewModel model)
        {
            try
            {
                var announcement = await _context.Announcements.FindAsync(model.Id);

                if (announcement == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement not found",
                        Errors = new List<string> { "Announcement with the specified ID does not exist" }
                    };
                }

                _context.Announcements.Remove(announcement);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Announcement deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the announcement" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the announcement",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateAnnouncementAsync(AnnouncementUpdateViewModel model)
        {
            try
            {
                var announcement = await _context.Announcements.FindAsync(model.Id);

                if (announcement == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement not found",
                        Errors = new List<string> { "Announcement with the specified ID does not exist" }
                    };
                }

                // Update the Announcement properties from the model
                announcement.UserId = model.UserId;
                announcement.OfferedCourseId = model.OfferedCourseId;
                announcement.Title = model.Title;
                announcement.Content = model.Content;
                announcement.CreatedAt = model.CreatedAt;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Announcement updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement update failed",
                        Errors = new List<string> { "Error occurred while updating the announcement" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the announcement",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
