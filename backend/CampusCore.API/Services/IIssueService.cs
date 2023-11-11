using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IIssueService
    {
        Task<ResponseManager> CreateIssueAsync(IssueAddViewModel model);
        Task<ResponseManager> ViewIssueListAsync();
        Task<ResponseManager> ViewIssueListOpenAsync();
        Task<ResponseManager> IssueGetByIdAsync(GetByIdModel model);
        Task<ResponseManager> DeleteIssueAsync(IssueDeleteModel model);
        Task<ResponseManager> UpdateIssueAsync(IssueUpdateViewModel model);
        Task<ResponseManager> SearchIssueAsync(IssueSearchViewModel model);

    }

    public class IssueService : IIssueService
    {
        private AppDbContext _context;
        public IssueService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateIssueAsync(IssueAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var issue = new Issue
            {
                Name = model.Name,
                Status = model.Status,
                DateOpened = model.DateOpened,
                DateClosed = model.DateClosed,
                UserId = model.UserId,

            };


            _context.Issues.Add(issue);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Issue created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Issue is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding issue in DB" }
            };





        }
        public async Task<ResponseManager> SearchIssueAsync(IssueSearchViewModel model)
        {
            string searchKey = model.SearchIssue;

            try
            {

                var searchResults = await _context.Issues
                    .Where(oc => EF.Functions.Like(oc.Name, $"%{model.SearchIssue}%"))
                    .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched issues retrieved successfully",
                    Data = searchResults
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching searched issues",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> ViewIssueListAsync()
        {


            try
            {
                var result = await _context.Issues.ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Issues retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching issues",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> ViewIssueListOpenAsync()
        {


            try
            {
                var result = await _context.Issues
                                           .Where(c => c.Status == "Open")
                                           .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Issues retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching Issues",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


        public async Task<ResponseManager> IssueGetByIdAsync(GetByIdModel model)
        {


            try
            {
                var result = await _context.Issues.FindAsync(model.Id);

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Issues retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching issues",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


        // Add a default return statement or throw an exception here.




        public async Task<ResponseManager> DeleteIssueAsync(IssueDeleteModel model)
        {
            try
            {
                var issue = await _context.Issues.FindAsync(model.Id);

                if (issue == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue not found",
                        Errors = new List<string> { "Issue with the specified ID does not exist" }
                    };
                }

                _context.Issues.Remove(issue);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Issue deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the issue" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the issue",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateIssueAsync(IssueUpdateViewModel model)
        {
            try
            {
                var issue = await _context.Issues.FindAsync(model.Id);

                if (issue == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue not found",
                        Errors = new List<string> { "Issue with the specified ID does not exist" }
                    };
                }

                // Update the Issue properties from the model
                issue.Name = model.Name;
                issue.Status = model.Status;
                issue.DateOpened = model.DateOpened;
                issue.DateClosed = model.DateClosed;
                issue.UserId = model.UserId;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Issue updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue update failed",
                        Errors = new List<string> { "Error occurred while updating the issue" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the issue",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
