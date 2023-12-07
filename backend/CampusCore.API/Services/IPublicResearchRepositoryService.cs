/*using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Net.NetworkInformation;

namespace CampusCore.API.Services
{
    public interface IPublicResearchRepositoryService
    {
        Task<ResponseManager> RequestUploadAsync(PublicResearchRepositoryAddViewModel model);
        Task<ResponseManager> ListPublishedAsync();
        Task<ResponseManager> ListRequestAsync();
        Task<ResponseManager> GetAllAsync();
        Task<ResponseManager> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> DeletePublicResearchRepositoryAsync(IntIdViewModel model);
        Task<ResponseManager> ApproveAsync(PublicResearchRepositoryApproveViewModel model);
        Task<ResponseManager> SearchPublicResearchRepositoryAsync(StringSearchViewModel model);
        Task<ResponseManager> AddViewLogAsync(ResearchViewLogAddViewModel model); //add a view log when user opens public research repository
        Task<ResponseManager> GetViewLogsByResearchAsync(IntIdViewModel model); //get view logs of specific research
        Task<ResponseManager> GetViewLogsByUserAsync(StringIdViewModel model); //get list of published research view by the user

    }

    public class PublicResearchRepositoryService : IPublicResearchRepositoryService
    {
        private AppDbContext _context;
        public PublicResearchRepositoryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> RequestUploadAsync(PublicResearchRepositoryAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");

            var submission = await _context.Submissions.FindAsync(model.SubmissionId);
            //to get authors
            var members = await _context.StudentGroups
                                        .Where(sg => sg.Id == submission.GroupId)
                                        .ToListAsync();
            string authors;
            if (members.Any())
            {
                authors = string.Join(", ", members.Select(group => group.Student.FullName));
                foreach (var member in members)
                {
                    _context.UserPublishedResearch.Add(new UserPublishedResearch
                    {
                        ResearchId = model.SubmissionId,
                        AuthorId = member.StudentId,
                    });
                   
                }
            }
            else
            {
                authors = submission.Submitter.FullName;
                _context.UserPublishedResearch.Add(new UserPublishedResearch
                {
                    ResearchId = model.SubmissionId,
                    AuthorId = submission.SubmitterId,
                });
            }

            var publicResearchRepository = new PublicResearchRepository
            {
                Title = model.Title,
                Description = model.Description,
                Authors = authors,
                SubmissionId = model.SubmissionId,
                FilePath = submissFilePath,
                DateUploaded = DateTime.Now,
            };


            _context.ResearchRepository.Add(publicResearchRepository);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Request for final research upload added successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Failed to create request for final research upload",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding research repository in DB" }
            };

        }
        public async Task<ResponseManager> SearchPublicResearchRepositoryAsync(StringSearchViewModel model)
        {
            string searchKey = model.SearchKey;

            try
            {

                var searchResults = await _context.ResearchRepository
                    .Where(oc => EF.Functions.Like(oc.Title, $"%{model.SearchKey}%"))
                    .Include(rr => rr.Submission)
                    .ToListAsync();


                var data = new List<PublicResearchRepositoryListViewModel>();
                foreach (var item in searchResults)
                {
                    var views = _context.ResearchViewLogs
                                        .Where(r => r.ResearchId == item.Id)
                                        .Count();

                    data.Add(new PublicResearchRepositoryListViewModel
                    {
                        Title = item.Title,
                        Description = item.Description,
                        Authors = item.Authors,
                        FilePath = item.FilePath,
                        DateUploaded = item.DateUploaded,
                        DateApproved = item.Submission.DAPRC,
                        Status = item.Status,
                        ViewCount = views
                    });
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched research repository retrieved successfully",
                    Data = data
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching searched research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllAsync()
        {

            try
            {
                var result = await _context.ResearchRepository
                                            .Include(rr => rr.Submission)
                                            .Include(rr=> rr.Submission.Group)
                                            .ToListAsync();
                var data = new List<PublicResearchRepositoryListViewModel>();
                foreach (var item in result)
                {
                    var views = _context.ResearchViewLogs
                                        .Where(r => r.ResearchId == item.Id)
                                        .Count();

                    data.Add(new PublicResearchRepositoryListViewModel
                    {
                        Title = item.Title,
                        Description = item.Description,
                        Authors = item.Authors,
                        FilePath = item.FilePath,
                        DateUploaded = item.DateUploaded,
                        DateApproved = item.Submission.DAPRC,
                        Status = item.Status,
                        ViewCount = views
                    });
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research repository retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching the research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }



        public async Task<ResponseManager> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model)
        {


            try
            {
                var item = await _context.ResearchRepository
                                            .Include (rr => rr.Submission)
                                            .Include(rr => rr.Submission.Group)
                                            .Where(rr => rr.Id == model.Id)
                                            .FirstOrDefaultAsync();
                var views = _context.ResearchViewLogs
                                        .Where(r => r.ResearchId == item.Id)
                                        .Count();

                var data = new PublicResearchRepositoryListViewModel
                    {
                        Title = item.Title,
                        Description = item.Description,
                        Authors = item.Authors,
                        FilePath = item.FilePath,
                        DateUploaded = item.DateUploaded,
                        DateApproved = item.Submission.DAPRC,
                        Status = item.Status,
                        ViewCount = views
                    };
                
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research repository retrieved successfully",
                    Data = data
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching the research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }





        public async Task<ResponseManager> DeletePublicResearchRepositoryAsync(IntIdViewModel model)
        {
            try
            {
                var publicResearchRepository = await _context.ResearchRepository.FindAsync(model.Id);

                if (publicResearchRepository == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Research repository not found",
                        Errors = new List<string> { "Research repository with the specified ID does not exist" }
                    };
                }

                _context.ResearchRepository.Remove(publicResearchRepository);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Research repository deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Research repository deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the research repository" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
       
        public async Task<ResponseManager> ListPublishedAsync()
        {
            try
            {
                var result = await _context.ResearchRepository
                                            .Include(rr => rr.Submission)
                                            .Include(rr => rr.Submission.Group)
                                            .Where(rr => rr.Status == "Published")
                                            .ToListAsync();

                var data = new List<PublicResearchRepositoryListViewModel>();
                foreach (var item in result)
                {
                    var views = _context.ResearchViewLogs
                                        .Where(r => r.ResearchId == item.Id)
                                        .Count();

                    data.Add( new PublicResearchRepositoryListViewModel
                    {
                        Title = item.Title,
                        Description = item.Description,
                        Authors = item.Authors,
                        FilePath = item.FilePath,
                        DateUploaded = item.DateUploaded,
                        DateApproved = item.Submission.DAPRC,
                        Status = item.Status,
                        ViewCount = views
                    });
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Published research papers retrieved successfully",
                    Data = data
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching published research papers",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> ListRequestAsync()
        {
            try
            {
                var result = await _context.ResearchRepository
                                            .Include(rr => rr.Submission)
                                            .Include(rr => rr.Submission.Group)
                                            .Where(rr => rr.Status != "Published")
                                            .ToListAsync();
                var data = new List<PublicResearchRepositoryListViewModel>();
                foreach (var item in result)
                {
                    var views = _context.ResearchViewLogs
                                        .Where(r => r.ResearchId == item.Id)
                                        .Count();

                    data.Add(new PublicResearchRepositoryListViewModel
                    {
                        Title = item.Title,
                        Description = item.Description,
                        Authors = item.Authors,
                        FilePath = item.FilePath,
                        DateUploaded = item.DateUploaded,
                        DateApproved = item.Submission.DAPRC,
                        Status = item.Status,
                        ViewCount = views
                    });
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research upload request retrieved successfully",
                    Data = data
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching the research uplaod request",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> ApproveAsync(PublicResearchRepositoryApproveViewModel model)
        {
            try
            {
                var request = await _context.ResearchRepository.FindAsync(model.RequestId);
                if(request == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Research upload request not found",
                        Errors = new List<string> { "Cannot find research upload request in public research repository table"}
                    };
                }

                var approverId = model.ApprovedBy;


                if (approverId != null)
                {
                    request.DateApproved = DateTime.Now;
                    request.ApproverId = approverId;
                    request.Status = "Published";

                    _context.ResearchRepository.Update(request);
                    var result = await _context.SaveChangesAsync();

                    if (result > 0)
                    {
                        return new ResponseManager
                        {
                            Message = "Research upload is approved successfuly. This research is now published in the public research repository",
                            IsSuccess = true,
                        };
                    }
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Failed to approve research upload request. Double check ApproverId",
                        Errors = new List<string> { "Cannot find research upload request in public research repository table" }
                    };
                }

                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "Unexpected error or invalid state occurred",
                    Errors = new List<string> { "Unexpected error or invalid state occurred" }
                };


            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred approving the research uplaod request",
                    Errors = new List<string> { ex.Message }
                };
            }

        }

        public async Task<ResponseManager> AddViewLogAsync(ResearchViewLogAddViewModel model)
        {
            try
            {
                _context.Add(new ResearchViewLog
                {
                    ResearchId = model.ResearchId,
                    UserId  = model.UserId,
                    Log = DateTime.Now
                });

                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    var research = _context.ResearchRepository.FindAsync(model.ResearchId);
                    
                    return new ResponseManager
                    {
                        Message = "View log added",
                        IsSuccess = true,
                    };
                }

                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "View log not added",
                    Errors = new List<string> {"View log is not added in ResearchViewLog table in DB"}
                };


            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred approving the research uplaod request",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetViewLogsByResearchAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.ResearchViewLogs
                                            .Include(vl => vl.Research)
                                            .Include(vl => vl.User)
                                            .Where(vl => vl.ResearchId == model.Id)
                                            .ToListAsync();

                var logsByUser = new List<ResearchViewLogViewModel>();

                foreach (var item in result)
                {
                    logsByUser.Add(new ResearchViewLogViewModel
                    {
                        ResearchTitle = item.Research.Title,
                        FullName = item.User.FullName,
                        Log = item.Log

                    });
                }

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research repository retrieved successfully",
                    Data = logsByUser
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching the research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetViewLogsByUserAsync(StringIdViewModel model)
        {
            try
            {
                var result = await _context.ResearchViewLogs
                                            .Include(vl => vl.Research)
                                            .Include(vl => vl.User)
                                            .Where(vl=> vl.UserId == model.Id)
                                            .ToListAsync();

                var logsByUser = new List<ResearchViewLogViewModel> ();

                foreach (var item in result)
                {
                    logsByUser.Add(new ResearchViewLogViewModel
                    {
                        ResearchTitle = item.Research.Title,
                        FullName = item.User.FullName,
                        Log = item.Log

                    });
                }

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research repository retrieved successfully",
                    Data = logsByUser
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching the research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        
    }
}
*/