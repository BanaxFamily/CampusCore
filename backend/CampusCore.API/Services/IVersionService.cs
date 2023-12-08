using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;
using System;

namespace CampusCore.API.Services
{
    public interface IVersionService
    {
        //adding a version is handled in creating a submission
        Task<ResponseManager> GetLatestVersionAsync(IntIdViewModel model); //pass submission id to get the latest version submitted for a submission
        Task<ResponseManager> GetAllSubmissionVersionsAsync(IntIdViewModel model); //pass submission id to get the all versions submitted for a version
        Task<ResponseManager> GetByIdAsync(IntIdViewModel model); //pass submission version id 
        Task<ResponseManager> GetAllAsync(); //pass submission version id 


    }

    public class VersionService : IVersionService
    {
        private AppDbContext _context;
        public VersionService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> GetAllAsync()
        {
           
            try
            {
                var result = await _context.SubmissionVersions
                                            .Include(s=>s.Version)
                                            .Include(s=>s.Submission)
                                            .ToListAsync();
                if (result.Count < 1)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "No versions available"
                    };
                }
                List<VersionViewModel> versions = new List<VersionViewModel>();
                foreach ( var item in result)
                {
                    byte[] fileBytes = File.ReadAllBytes(item.Version.FilePath);
                    var fileB64 = Convert.ToBase64String(fileBytes);
                    versions.Add(new VersionViewModel
                    {
                        VersionId = item.VersionId,
                        VersionNumber = item.Version.VersionNumber,
                        DateSubmitted = item.Version.DateSubmitted,
                        FileB64 = fileB64,
                        FileType = item.Version.FileType,
                        TargetedIssues = item.Version.TargetedIssues != null
                                            ? item.Version.TargetedIssues.Split(',')
                                                                           .Select(int.Parse)
                                                                           .ToArray()
                                            : Array.Empty<int>()
                    });
                }
                
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "All submission versions retrieved successfully",
                    Data = versions
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submission versions",
                    Errors = new List<string> { ex.Message }
                };
            }

        }

        public async Task<ResponseManager> GetAllSubmissionVersionsAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.SubmissionVersions
                                            .Include(s => s.Version)
                                            .Include(s => s.Submission)
                                            .Where(s=> s.SubmissionId == model.Id)
                                            .ToListAsync();
                if (result.Count < 1)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "No versions available"
                    };
                }

                List<VersionViewModel> versions = new List<VersionViewModel>();
                foreach (var item in result)
                {
                    byte[] fileBytes = File.ReadAllBytes(item.Version.FilePath);
                    var fileB64 = Convert.ToBase64String(fileBytes);
                    versions.Add(new VersionViewModel
                    {
                        VersionId = item.VersionId,
                        VersionNumber = item.Version.VersionNumber,
                        DateSubmitted = item.Version.DateSubmitted,
                        FileB64 = fileB64,
                        FilePath = item.Version.FilePath,
                        FileType = item.Version.FileType,
                        TargetedIssues = item.Version.TargetedIssues != null
                                            ? item.Version.TargetedIssues.Split(',')
                                                                           .Select(int.Parse)
                                                                           .ToArray()
                                            : Array.Empty<int>()
                });
                }
                
                
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Submissions for {result.First().Submission.Title} retrieved successfully",
                    Data = versions
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submission versions",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async  Task<ResponseManager> GetByIdAsync(IntIdViewModel model)
        {
            try
            {
                var item = await _context.Versions
                                            .FindAsync(model.Id);

                if (item == null)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "No versions available"
                    };
                }
                byte[] fileBytes = File.ReadAllBytes(item.FilePath);
                var fileB64 = Convert.ToBase64String(fileBytes);
                var version = new VersionViewModel
                {
                    VersionId = item.VersionId,
                    VersionNumber = item.VersionNumber,
                    DateSubmitted = item.DateSubmitted,
                    FileB64 = fileB64,
                    FileType = item.FileType,
                    TargetedIssues = item.TargetedIssues != null
                                            ? item.TargetedIssues.Split(',')
                                                                           .Select(int.Parse)
                                                                           .ToArray()
                                            : Array.Empty<int>()
                };
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Submissions version with id: {model.Id} retrieved successfully",
                    Data = version
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submission versions",
                    Errors = new List<string> { ex.Message
    }
                };
            }
        }

        public async Task<ResponseManager> GetLatestVersionAsync(IntIdViewModel model)
        {
            try
            {
                var item = await _context.SubmissionVersions
                                            .Include(s => s.Version)
                                            .Include(s => s.Submission)
                                            .Where(s => s.SubmissionId == model.Id)
                                            .OrderByDescending(s => s.Version.DateSubmitted)
                                            .FirstOrDefaultAsync();

                    byte[] fileBytes = File.ReadAllBytes(item.Version.FilePath);
                    var fileB64 = Convert.ToBase64String(fileBytes);
                    var version = new VersionViewModel  
                    {
                        VersionId = item.VersionId,
                        VersionNumber = item.Version.VersionNumber,
                        DateSubmitted = item.Version.DateSubmitted,
                        FileB64 = fileB64,
                        FileType = item.Version.FileType,
                        TargetedIssues = item.Version.TargetedIssues != null
                                                ? item.Version.TargetedIssues.Split(',')
                                                                               .Select(int.Parse)
                                                                               .ToArray()
                                                : Array.Empty<int>()
                    };
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Latest version for retrieved successfully",
                    Data = version
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submission versions",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
    }
}
