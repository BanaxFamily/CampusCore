using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;
using static CampusCore.Shared.GetSubmissionsForFacultyViewModel;

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
        Task<ResponseManager> ViewApprovalCertificate(ApprovalCertificate model);
    }

    public class PublicResearchRepositoryService : IPublicResearchRepositoryService
    {
        private AppDbContext _context;
        private string _uploadPath;

        public PublicResearchRepositoryService(AppDbContext context)
        {
            _context = context;
            var currentDirectory = Directory.GetCurrentDirectory();
            var goUp = Directory.GetParent(currentDirectory);
            var goUp2 = Directory.GetParent(goUp.ToString());
            var basePath = goUp2.ToString();

            // Combine it with the 'Uploads' directory
            _uploadPath = Path.Combine(basePath.ToString(), "FinalPapers");

            // Check if the directory exists; create it if not
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }
        public async Task<ResponseManager> RequestUploadAsync(PublicResearchRepositoryAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");

            var submissionVersion = await _context.SubmissionVersions
                                           .Include(sv => sv.Submission)
                                           .Include(sv => sv.Submission.Submitter)
                                           .Include(sv => sv.Version)
                                           .Where(sv => sv.SubmissionId == model.SubmissionId)
                                           .OrderByDescending(sv => sv.Version.VersionNumber)
                                           .FirstOrDefaultAsync();
            if (submissionVersion == null)
            {
                return new ErrorResponseManager
                {
                    Message = "Submission not found",
                    IsSuccess = false,
                    Errors = new List<string>() { "Submission version not found in DB" }
                };
            }

            var file = submissionVersion.Version.FilePath;
            FormFile formFile;

            if (!File.Exists(file))
            {
                return new ErrorResponseManager
                {
                    Message = "File does not exist",
                    IsSuccess = false,
                    Errors = new List<string>() { "The version does not contain a valid file in DB" }
                };
            }

            // Read the file into a byte array
            byte[] fileBytes = File.ReadAllBytes(file);

            // Create a MemoryStream from the byte array
            var stream = new MemoryStream(fileBytes);
            // Create an IFormFile instance using the MemoryStream and other necessary parameters
            formFile = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(file))
            {
                Headers = new HeaderDictionary(),
                ContentType = "application/octet-stream", // Set the appropriate content type
            };


            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
            var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await formFile.CopyToAsync(fileStream);
            }
            //to get authors
            var members = await _context.StudentGroups
                                        .Include(sg => sg.Student)
                                        .Where(sg => sg.Id == submissionVersion.Submission.GroupId)
                                        .ToListAsync();
            string authors;
            if (members.Any())
            {
                authors = string.Join(", ", members.Select(group => group.Student.FullName));
                var publicResearchRepository = new PublicResearchRepository
                {
                    Title = model.Title,
                    Authors = authors,
                    SubmissionId = model.SubmissionId,
                    FilePath = filePath,
                    DateUploaded = DateTime.Now,
                    Status = "Pending",
                };


                _context.ResearchRepository.Add(publicResearchRepository);
                var result = await _context.SaveChangesAsync();
                foreach (var member in members)
                {
                    _context.UserPublishedResearch.Add(new UserPublishedResearch
                    {
                        ResearchId = publicResearchRepository.Id,
                        AuthorId = member.StudentId,
                    });

                }
                var res = await _context.SaveChangesAsync();
                if (res > 0)
                {
                    return new ResponseManager
                    {
                        Message = "Request for final research upload added successfully!",
                        IsSuccess = true
                    };
                }
            }
            else
            {
                var publicResearchRepository = new PublicResearchRepository
                {
                    Title = model.Title,
                    Authors = submissionVersion.Submission.Submitter.FullName,
                    SubmissionId = model.SubmissionId,
                    FilePath = filePath,
                    DateUploaded = DateTime.Now,
                    Status = "Pending",
                };


                _context.ResearchRepository.Add(publicResearchRepository);
                var result = await _context.SaveChangesAsync();
                authors = submissionVersion.Submission.Submitter.FullName;
                _context.UserPublishedResearch.Add(new UserPublishedResearch
                {
                    ResearchId = publicResearchRepository.Id,
                    AuthorId = submissionVersion.Submission.SubmitterId,
                });
                var res = await _context.SaveChangesAsync();
                if (res > 0)
                {
                    return new ResponseManager
                    {
                        Message = "Request for final research upload added successfully!",
                        IsSuccess = true
                    };
                }
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
                    .Select(item => new
                    {
                        Title = item.Title,
                        Authors = item.Authors,
                        FileB64 = Convert.ToBase64String(File.ReadAllBytes(item.FilePath)),
                        DateUploaded = item.DateUploaded,
                        DateApproved = item.DateApproved,
                        Status = item.Status,
                        ViewCount = _context.ResearchViewLogs
                                    .Where(r => r.ResearchId == item.Id)
                                    .Count()
                    })
                    .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched research repository retrieved successfully",
                    Data = searchResults
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
                                            .Select(item => new
                                            {
                                                Title = item.Title,
                                                Authors = item.Authors,
                                                FileB64 = Convert.ToBase64String(File.ReadAllBytes(item.FilePath)),
                                                DateUploaded = item.DateUploaded,
                                                DateApproved = item.DateApproved,
                                                Status = item.Status,
                                                ViewCount = _context.ResearchViewLogs
                                    .Where(r => r.ResearchId == item.Id)
                                    .Count()
                                            })
                                            .ToListAsync();

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
                                            .Where(rr => rr.Id == model.Id)
                                            .Select(item => new
                                            {
                                                Title = item.Title,
                                                Authors = item.Authors,
                                                FileB64 = Convert.ToBase64String(File.ReadAllBytes(item.FilePath)),
                                                DateUploaded = item.DateUploaded,
                                                DateApproved = item.DateApproved,
                                                Status = item.Status,
                                                ViewCount = _context.ResearchViewLogs
                                    .Where(r => r.ResearchId == item.Id)
                                    .Count()
                                            })
                                            .FirstOrDefaultAsync();




                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research repository retrieved successfully",
                    Data = item
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
                                            .Where(rr => rr.Status == "Published")
                                            .Select(item => new
                                            {
                                                Title = item.Title,
                                                Authors = item.Authors,
                                                FileB64 = Convert.ToBase64String(File.ReadAllBytes(item.FilePath)),
                                                DateUploaded = item.DateUploaded,
                                                DateApproved = item.DateApproved,
                                                Status = item.Status,
                                                ResearchId = item.Id,
                                                ViewCount = _context.ResearchViewLogs
                                    .Where(r => r.ResearchId == item.Id)
                                    .Count()
                                            })
                                            .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Published research papers retrieved successfully",
                    Data = result
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
                                            .Where(rr => rr.Status != "Published")
                                            .Select(item => new
                                            {
                                                Title = item.Title,
                                                Authors = item.Authors,
                                                FileB64 = Convert.ToBase64String(File.ReadAllBytes(item.FilePath)),
                                                DateUploaded = item.DateUploaded,
                                                DateApproved = item.DateApproved,
                                                Status = item.Status,
                                                SubmissionId = item.SubmissionId,
                                                RequestId = item.Id,
                                                ViewCount = _context.ResearchViewLogs

                                    .Where(r => r.ResearchId == item.Id)
                                    .Count()
                                            })
                                            .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Research upload request retrieved successfully",
                    Data = result
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
                if (request == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Research upload request not found",
                        Errors = new List<string> { "Cannot find research upload request in public research repository table" }
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
                    UserId = model.UserId,
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
                    Errors = new List<string> { "View log is not added in ResearchViewLog table in DB" }
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
                                            .Where(vl => vl.UserId == model.Id)
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

        public async Task<ResponseManager> ViewApprovalCertificate(ApprovalCertificate model)
        {
            try
            {
                var result = await _context.SubmissionApprovals
                                            .Where(sa => sa.SubmissionId == model.SubmissionId)
                                            .Select(x => new
                                            {
                                                ApproverId = x.Approval.ApproverId,
                                                ApproverName = x.Approval.Approver.FullName,
                                                ApproverRole = x.Approval.ApproverRole,
                                                Level = x.Approval.Level,
                                                ApprovalDate = x.Approval.ApprovalDate

                                            })
                                            .ToListAsync();



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


    }
}
