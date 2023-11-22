
using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IAnnouncementCommentService
    {
        Task<ResponseManager> CreateAnnouncementCommentAsync(AnnouncementCommentAddViewModel model);
        Task<ResponseManager> ViewAnnouncementCommentListAsync(); // new method to get AnnouncementComment
        Task<ResponseManager> DeleteAnnouncementCommentAsync(IntIdViewModel model); // New method to delete a AnnouncementComment
        Task<ResponseManager> UpdateAnnouncementCommentAsync(AnnouncementCommentUpdateViewModel model);
        //Task<ResponseManager> UpdateAnnouncementCommentAsync(model);

    }

    public class AnnouncementCommentService : IAnnouncementCommentService
    {
        private AppDbContext _context;
        public AnnouncementCommentService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateAnnouncementCommentAsync(AnnouncementCommentAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var announcementComment = new AnnouncementComment
            {
                AnnouncementId = model.AnnouncementId,
                UserId = model.UserId,
                Content = model.Content,
                CreatedAt = model.CreatedAt

            };


            _context.AnnouncementComments.Add(announcementComment);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Comment for the announcement created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Comment for the announcement was not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding comment for the announcement in the Database" }
            };





        }

        public async Task<ResponseManager> ViewAnnouncementCommentListAsync()
        {
            try
            {
                var result = await _context.AnnouncementComments
                                            .Include(x => x.Announcement)
                                            .Include(x => x.User)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Announcement Comments retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching announcement comments",
                    Errors = new List<string> { ex.Message }
                };
            }

            // Add a default return statement or throw an exception here.
        }



        public async Task<ResponseManager> DeleteAnnouncementCommentAsync(IntIdViewModel model)
        {
            try
            {
                var announcementComment = await _context.AnnouncementComments.FindAsync(model.Id);

                if (announcementComment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "The comment for the announcement was not found",
                        Errors = new List<string> { "The comment for the announcement with the specified ID does not exist" }
                    };
                }

                _context.AnnouncementComments.Remove(announcementComment);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Comment for the announcement deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement comment deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the comment for the announcement" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the comment for the announcement",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateAnnouncementCommentAsync(AnnouncementCommentUpdateViewModel model)
        {
            try
            {
                var announcementComment = await _context.AnnouncementComments.FindAsync(model.Id);

                if (announcementComment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Comment for the announcement was not found",
                        Errors = new List<string> { "Comment for the announcement with the specified ID does not exist" }
                    };
                }

                // Update the Announcement Comment properties from the model

                announcementComment.AnnouncementId = model.AnnouncementId;
                announcementComment.UserId = model.UserId;
                announcementComment.Content = model.Content;
                announcementComment.CreatedAt = model.CreatedAt;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Comment for the announcement updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement comment update failed",
                        Errors = new List<string> { "Error occurred while updating the comment for the announcement" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the comment for the announcement",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
