
using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IPublicResearchRepositoryService
    {
        Task<ResponseManager> RequestUploadAsync(PublicResearchRepositoryAddViewModel model);
        Task<ResponseManager> ListApprovedAsync();
        Task<ResponseManager> ListRequestAsync();
        Task<ResponseManager> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> DeletePublicResearchRepositoryAsync(IntIdViewModel model);
        Task<ResponseManager> SearchPublicResearchRepositoryAsync(StringSearchViewModel model);

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
            
           
            var publicResearchRepository = new PublicResearchRepository
            {
                Title = model.Title,
                Description = model.Description,
                Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                SubmissionId = model.SubmissionId,
                FilePath = submission.FilePath,
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

        public async Task<ResponseManager> ViewPublicResearchRepositoryListAsync()
        {

            try
            {
                var result = await _context.ResearchRepository
                                            .Include(rr => rr.Submission)
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

        //public async Task<ResponseManager> ViewPublicResearchRepositoryListOpenAsync()
        //{


        //    try
        //    {
        //        var result = await _context.ResearchRepository
        //                                   .Where(c => c.Status == "Open")
        //                                   .ToListAsync();

        //        return new DataResponseManager
        //        {
        //            IsSuccess = true,
        //            Message = "Research repository retrieved successfully",
        //            Data = result
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ErrorResponseManager
        //        {
        //            IsSuccess = false,
        //            Message = "An error occurred while fetching the research repository",
        //            Errors = new List<string> { ex.Message }
        //        };
        //    }
        //}


        public async Task<ResponseManager> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model)
        {


            try
            {
                var result = await _context.ResearchRepository
                                            .Include (rr => rr.Submission)
                                            .Where(rr => rr.Id == model.Id)
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


        // Add a default return statement or throw an exception here.




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

        public async Task<ResponseManager> UpdatePublicResearchRepositoryAsync(PublicResearchRepositoryUpdateViewModel model)
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

                // Update the research repository properties from the model
                publicResearchRepository.Title = model.Title;
                publicResearchRepository.Description = model.Description;
                publicResearchRepository.Authors = model.Authors;
                publicResearchRepository.SubmissionId = model.SubmissionId;
                publicResearchRepository.FilePath = model.FilePath;
                publicResearchRepository.DateUploaded = model.DateUploaded;
                publicResearchRepository.DateApproved = model.DateApproved;
                publicResearchRepository.Status = model.Status;
                publicResearchRepository.ViewCount = model.ViewCount;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Research repository updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Research repository update failed",
                        Errors = new List<string> { "Error occurred while updating the research repository" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the research repository",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public Task<ResponseManager> ListApprovedAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseManager> ListRequestAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseManager> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseManager> DeletePublicResearchRepositoryAsync(IntIdViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseManager> SearchPublicResearchRepositoryAsync(StringSearchViewModel model)
        {
            throw new NotImplementedException();
        }
    }
}
