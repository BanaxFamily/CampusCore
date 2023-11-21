
using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IAnnouncementCommentService
    {
        Task<ResponseManager> CreateAnnouncementCommentAsync(AnnouncementCommentAddViewModel model);
        Task<ResponseManager> ViewAnnouncementCommentListAsync(AnnouncementCommentListViewModel model); // new method to get AnnouncementComment
        Task<ResponseManager> DeleteAnnouncementCommentAsync(AnnouncementCommentDeleteModel model); // New method to delete a AnnouncementComment
        Task<ResponseManager> UpdateAnnouncementCommentAsync(AnnouncementCommentUpdateViewModel model);

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
                    Message = "User created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Announcement Comment is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding Announcement Comment in DB" }
            };





        }

        public async Task<ResponseManager> ViewAnnouncementCommentListAsync(AnnouncementCommentListViewModel model)
        {
            string searchKey = model.SearchAnnouncementComment;

            if (string.IsNullOrEmpty(model.SearchAnnouncementComment) || string.IsNullOrWhiteSpace(model.SearchAnnouncementComment))
            {
                try
                {
                    var result = await _context.AnnouncementComments.ToListAsync();

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Announcement Comment retrieved successfully",
                        Data = result
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching announcement comment",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            else
            {
                try
                {

                    var searchResults = await _context.AnnouncementComments
                        .Where(oc => EF.Functions.Like(oc.Content, $"%{model.SearchAnnouncementComment}%"))
                        .ToListAsync();



                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Announcement comment retrieved successfully",
                        Data = searchResults
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
            }

            // Add a default return statement or throw an exception here.
        }



        public async Task<ResponseManager> DeleteAnnouncementCommentAsync(AnnouncementCommentDeleteModel model)
        {
            try
            {
                var announcementComment = await _context.AnnouncementComments.FindAsync(model.Id);

                if (announcementComment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement comment not found",
                        Errors = new List<string> { "Announcement comment with the specified ID does not exist" }
                    };
                }

                _context.AnnouncementComments.Remove(announcementComment);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Announcement comment deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement comment deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the announcement comment" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the announcement comment",
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
                        Message = "Announcement comment not found",
                        Errors = new List<string> { "Announcement comment with the specified ID does not exist" }
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
                        Message = "Announcement comment updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Announcement comment update failed",
                        Errors = new List<string> { "Error occurred while updating the announcement comment" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the announcement comment",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
