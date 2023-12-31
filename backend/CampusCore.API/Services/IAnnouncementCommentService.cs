﻿
using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IAnnouncementCommentService
    {
        Task<ResponseManager> CreateAnnouncementCommentAsync(AnnouncementCommentAddViewModel model);
        Task<ResponseManager> GetAllByAnnouncement(IntIdViewModel model); // new method to get AnnouncementComment
        Task<ResponseManager> DeleteAnnouncementCommentAsync(IntIdViewModel model); // New method to delete a AnnouncementComment
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
                CreatedAt = DateTime.Now

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

        public async Task<ResponseManager> GetAllByAnnouncement(IntIdViewModel model)
        {
            try
            {
                var result = await _context.AnnouncementComments
                                            .Where(x => x.AnnouncementId == model.Id)
                                            .Select(x=> new
                                            {
                                                AnnouncementId = x.AnnouncementId,
                                                UserId = x.UserId,
                                                UserFullName = x.User.FullName,
                                                CommentId = x.Id,
                                                Content = x.Content,
                                                CreatedAt = x.CreatedAt

                                            })
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

        


    }
}
