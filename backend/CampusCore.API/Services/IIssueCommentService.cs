using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IIssueCommentService
    {
        Task<ResponseManager> CreateIssueCommentAsync(IssueCommentAddViewModel model);
        Task<ResponseManager> ViewIssueCommentListAsync();
        Task<ResponseManager> IssueCommentGetByIdAsync(GetByIdModel model);
        Task<ResponseManager> DeleteIssueCommentAsync(IssueCommentDeleteModel model);
        Task<ResponseManager> UpdateIssueCommentAsync(IssueCommentUpdateViewModel model);
        Task<ResponseManager> SearchIssueCommentAsync(IssueCommentSearchViewModel model);

    }

    public class IssueCommentService : IIssueCommentService
    {
        private AppDbContext _context;
        public IssueCommentService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateIssueCommentAsync(IssueCommentAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var issueComment = new IssueComment
            {
                IssueId = model.IssueId,
                UserId = model.UserId,
                CommentText = model.CommentText,
                CommentDate = model.CommentDate,
            };


            _context.IssueComments.Add(issueComment);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Issie comment created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Issue comment is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding issue comment in DB" }
            };





        }
        public async Task<ResponseManager> SearchIssueCommentAsync(IssueCommentSearchViewModel model)
        {
            string searchKey = model.SearchIssueComment;

            try
            {

                var searchResults = await _context.IssueComments
                    .Where(oc => EF.Functions.Like(oc.CommentText, $"%{model.SearchIssueComment}%"))
                    .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched issue comments retrieved successfully",
                    Data = searchResults
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching searched issue comments",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> ViewIssueCommentListAsync()
        {


            try
            {
                var result = await _context.IssueComments.ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Issue comments retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching issue comments",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
        public async Task<ResponseManager> IssueCommentGetByIdAsync(GetByIdModel model)
        {


            try
            {
                var result = await _context.IssueComments.FindAsync(model.Id);

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Issue comments retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching issue comments",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


        // Add a default return statement or throw an exception here.




        public async Task<ResponseManager> DeleteIssueCommentAsync(IssueCommentDeleteModel model)
        {
            try
            {
                var issueComment = await _context.IssueComments.FindAsync(model.Id);

                if (issueComment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue comment not found",
                        Errors = new List<string> { "Issue comment with the specified ID does not exist" }
                    };
                }

                _context.IssueComments.Remove(issueComment);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Issue comment deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue comment deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the issue comment" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the issue comment",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateIssueCommentAsync(IssueCommentUpdateViewModel model)
        {
            try
            {
                var issueComment = await _context.IssueComments.FindAsync(model.Id);

                if (issueComment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue comment not found",
                        Errors = new List<string> { "Issue comment with the specified ID does not exist" }
                    };
                }

                // Update the issueComment properties from the model
                issueComment.IssueId = model.IssueId;
                issueComment.UserId = model.UserId;
                issueComment.CommentText = model.CommentText;
                issueComment.CommentDate = model.CommentDate;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Issue comment updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue comment update failed",
                        Errors = new List<string> { "Error occurred while updating the issue comment" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the issue comment",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
