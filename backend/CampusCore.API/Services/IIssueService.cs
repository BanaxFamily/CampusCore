using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IIssueService
    {
        Task<ResponseManager> CreateIssueAsync(IssueAddViewModel model);
        Task<ResponseManager> GetAllByUserAsync(IssueGetAllModel model); //get issue that concerns a user (can be student or faculty, the one who needs to resolve the issue) not the one who opened the issue
        Task<ResponseManager> GetAllBySubmissionAsync(IssueGetAllModel model);
        Task<ResponseManager> IssueGetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> DeleteIssueAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateIssueAsync(IssueUpdateViewModel model);
       // Task<ResponseManager> SearchIssueAsync(IssueSearchViewModel model); 

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
                _context.SubmissionIssues.Add(new SubmissionIssue
                {
                    IssueId = issue.Id,
                    SubmissionId = model.SubmissionId
                });
                var res = await _context.SaveChangesAsync();
                if(res > 0)
                {
                    return new ResponseManager
                    {
                        Message = "Issue created successfully!",
                        IsSuccess = true
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        Message = "Issue is created but failed to associate with submission",
                        IsSuccess = false,
                        Errors = new List<string>() { "Error adding issue in DB" }
                    };
                }
                

            }



            return new ErrorResponseManager
            {
                Message = "Issue is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding issue in DB" }
            };





        }
        //public async Task<ResponseManager> SearchIssueAsync(IssueSearchViewModel model)
        //{
        //    string searchKey = model.SearchIssue;

        //    try
        //    {

        //        var searchResults = await _context.Issues
        //            .Where(oc => EF.Functions.Like(oc.Name, $"%{model.SearchIssue}%"))
        //            .ToListAsync();



        //        return new DataResponseManager
        //        {
        //            IsSuccess = true,
        //            Message = "Searched issues retrieved successfully",
        //            Data = searchResults
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ErrorResponseManager
        //        {
        //            IsSuccess = false,
        //            Message = "An error occurred while fetching searched issues",
        //            Errors = new List<string> { ex.Message }
        //        };
        //    }
        //}

        public async Task<ResponseManager> GetAllBySubmissionAsync(IssueGetAllModel model)
        {
            var submissionId = model.SubmissionId;

            if(model.Filter == "open")
            {
                try
                {
                    var result = await _context.SubmissionIssues
                                                .Where(si => si.SubmissionId == submissionId)
                                                .Select(si => si.Issue)
                                                .Where(i=> i.Status == "open")
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
                        Message = "An error occurred while fetching issues",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            if (model.Filter == "close")
            {
                try
                {
                    var result = await _context.SubmissionIssues
                                                .Where(si => si.SubmissionId == submissionId)
                                                .Select(si => si.Issue)
                                                .Where(i => i.Status == "closed")
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
                        Message = "An error occurred while fetching issues",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            else
            {
                try
                {
                    var result = await _context.SubmissionIssues
                                                .Where(si => si.SubmissionId == submissionId)
                                                .Select(si => si.Issue)
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
                        Message = "An error occurred while fetching issues",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            
        }

        public async Task<ResponseManager> GetAllByUserAsync(IssueGetAllModel model)
        {
            var userId = model.UserId;
            var userGroupID = _context.StudentGroups
                                      .Where(sg => sg.StudentId == userId)
                                      .Select(sg=> sg.GroupId)
                                      .FirstOrDefault();

            if (model.Filter == "open")
            {
                try
                {
                    var result = await _context.SubmissionIssues
                                                .Where(si => si.Submission.GroupId == userGroupID || si.Submission.SubmitterId == userId)
                                                .Select(si => si.Issue)
                                                .Where(i => i.Status == "open")
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
                        Message = "An error occurred while fetching issues",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            if (model.Filter == "close")
            {
                try
                {
                    var result = await _context.SubmissionIssues
                                                .Where(si => si.Submission.GroupId == userGroupID || si.Submission.SubmitterId == userId)
                                                .Select(si => si.Issue)
                                                .Where(i => i.Status == "closed")
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
                        Message = "An error occurred while fetching issues",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            else
            {
                try
                {
                    var result = await _context.SubmissionIssues
                                                .Where(si => si.Submission.GroupId == userGroupID || si.Submission.SubmitterId == userId)
                                                .Select(si => si.Issue)
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
                        Message = "An error occurred while fetching issues",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }

        }

        public async Task<ResponseManager> ViewIssueListOpenAsync()
        {


            try
            {
                var result = await _context.Issues
                                           .Where(i => i.Status == "Open")
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


        public async Task<ResponseManager> IssueGetByIdAsync(IntIdViewModel model)
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


        

        public async Task<ResponseManager> DeleteIssueAsync(IntIdViewModel model)
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

                //remove in junction table first
                var submissionIssue = await _context.SubmissionIssues.FindAsync(model.Id);
                if (submissionIssue == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Issue not associated with any submission",
                        Errors = new List<string> { "Issue with the specified ID is not in submission issue table" }
                    };
                }
                _context.SubmissionIssues.Remove(submissionIssue);
                var res = await _context.SaveChangesAsync();

                if (res > 0)
                {
                    //then remove issue in issues table
                    _context.Issues.Remove(issue);
                    var result = await _context.SaveChangesAsync();
                    if (result > 0)
                    {
                        return new ResponseManager
                        {
                            Message = "Issue deleted successfully!",
                            IsSuccess = true
                        };
                    }
                    else
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Issue is deleted but failed to update with submission issues table",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error deleting issue in DB" }
                        };
                    }


                }
                return new ErrorResponseManager
                {
                    Message = "Issue cannot be deleted in submission issues",
                    IsSuccess = false,
                    Errors = new List<string>() { "Error deleting issue in DB" }
                };

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
