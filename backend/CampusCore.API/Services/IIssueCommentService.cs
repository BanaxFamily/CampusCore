using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IIssueCommentService
    {
        Task<ResponseManager> CreateIssueCommentAsync(IssueCommentAddViewModel model);
        Task<ResponseManager> ViewIssueCommentListAsync();
        Task<ResponseManager> IssueCommentGetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> DeleteIssueCommentAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateIssueCommentAsync(IssueCommentUpdateViewModel model);
        Task<ResponseManager> SearchIssueCommentAsync(StringSearchViewModel model);

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
                    Message = "Issue's comment created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Issue's comment is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding issue's comment in the database" }
            };





        }
        public async Task<ResponseManager> SearchIssueCommentAsync(StringSearchViewModel model)
        {
            string searchKey = model.SearchKey;

            try
            {

                var searchResults = await _context.IssueComments
                    .Where(oc => EF.Functions.Like(oc.CommentText, $"%{model.SearchKey}%"))
                    .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched comment for the issue retrieved successfully",
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
                    Message = "Issue's comments retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching issue's comments",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
        public async Task<ResponseManager> IssueCommentGetByIdAsync(IntIdViewModel model)
        {


            try
            {
                var result = await _context.IssueComments.FindAsync(model.Id);

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Issue's comments retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching issue's comments",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


        // Add a default return statement or throw an exception here.




        public async Task<ResponseManager> DeleteIssueCommentAsync(IntIdViewModel model)
        {
            try
            {
                var issueComment = await _context.IssueComments.FindAsync(model.Id);

                if (issueComment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue's comment not found",
                        Errors = new List<string> { "Issue's comment with the specified ID does not exist" }
                    };
                }

                _context.IssueComments.Remove(issueComment);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Issue's comment deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue's comment deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the issue's comment" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the issue's comment",
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
                        Message = "Issue's comment not found",
                        Errors = new List<string> { "Issue's comment with the specified ID does not exist" }
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
                        Message = "Issue's comment updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue's comment update failed",
                        Errors = new List<string> { "Error occurred while updating the issue's comment" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the issue's comment",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
