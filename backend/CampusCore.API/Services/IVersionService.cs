using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

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
           /* var filePath = item.FilePath;

            // Open the file stream
            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            // Create an IFormFile instance
            var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
            {
                Headers = new HeaderDictionary(),
                ContentType = "application/octet-stream" // Set the content type based on your file type
            };*/
            try
            {
                var result = await _context.SubmissionVersions
                                            .Include(s=>s.Version)
                                            .Include(s=>s.Submission)
                                            .ToListAsync();

                List<SubmissionVersion> data = new List<SubmissionVersion>();
                foreach ( var item in result)
                {
                    
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submission versions retrieved successfully",
                    Data = result
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

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Submissions for {result.First().Submission.Title} retrieved successfully",
                    Data = result
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
                var result = await _context.Versions
                                            .FindAsync(model.Id);


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Submissions version with id: {model.Id} retrieved successfully",
                    Data = result
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
                var result = await _context.SubmissionVersions
                                            .Include(s => s.Version)
                                            .Include(s => s.Submission)
                                            .Where(s => s.SubmissionId == model.Id)
                                            .OrderByDescending(s => s.Version.DateSubmitted)
                                            .FirstOrDefaultAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Latest version for retrieved successfully",
                    Data = result
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
