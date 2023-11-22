
using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IPublicResearchRepositoryService
    {
        Task<ResponseManager> CreatePublicResearchRepositoryAsync(PublicResearchRepositoryAddViewModel model);
        Task<ResponseManager> ViewPublicResearchRepositoryListAsync();
        //Task<ResponseManager> ViewPublicResearchRepositoryListOpenAsync();
        Task<ResponseManager> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> DeletePublicResearchRepositoryAsync(IntIdViewModel model);
        Task<ResponseManager> UpdatePublicResearchRepositoryAsync(PublicResearchRepositoryUpdateViewModel model);
        Task<ResponseManager> SearchPublicResearchRepositoryAsync(StringSearchViewModel model);

    }

    public class PublicResearchRepositoryService : IPublicResearchRepositoryService
    {
        private AppDbContext _context;
        public PublicResearchRepositoryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreatePublicResearchRepositoryAsync(PublicResearchRepositoryAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var publicResearchRepository = new PublicResearchRepository
            {
                Title = model.Title,
                Description = model.Description,
                Authors = model.Authors,
                SubmissionId = model.SubmissionId,
                FilePath = model.FilePath,
                DateUploaded = model.DateUploaded,
                DateApproved = model.DateApproved,
                Status = model.Status,
                ViewCount = model.ViewCount,

            };


            _context.ResearchRepository.Add(publicResearchRepository);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Research repository created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Research repository is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding research repository in DB" }
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


    }
}
