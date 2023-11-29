using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IDeliverableServices
    {
        Task<ResponseManager> CreateDeliverableAsync(DeliverableAddViewModel model);
        Task<ResponseManager> ViewDeliverableAsync();
        Task<ResponseManager> UpdateDeliverableAsync(DeliverableUpdateViewModel model);
        Task<ResponseManager> DeleteDeliverableAsync(IntIdViewModel model);
        Task<ResponseManager> SearchDeliverableAsync(DeliverableSearchViewModel model);
        Task<ResponseManager> DeliverableGetByIdAsync(IntIdViewModel model);

    }

    public class DeliverableService : IDeliverableServices
    {
        private AppDbContext _context;
        public DeliverableService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseManager> CreateDeliverableAsync(DeliverableAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var deliverable = new Deliverable
            {
                Name = model.Name,
                Description = model.Description,
                Instruction = model.Instruction,
                ForAdviser = model.ForAdviser,
                GroupSubmission = model.GroupSubmission
            };


            _context.Deliverables.Add(deliverable);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var deliverableId = deliverable.Id;
                return new DataResponseManager
                {
                    Message = "Deliverable created successfully!",
                    IsSuccess = true,
                    Data = deliverableId
                };

            }



            return new ErrorResponseManager
            {
                Message = "Deliverable is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding deliverable in DB" }
            };

        }

        public async Task<ResponseManager> DeleteDeliverableAsync(IntIdViewModel model)
        {
            try
            {
                var deliverable = await _context.Deliverables.FindAsync(model.Id);

                if (deliverable == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Course not found",
                        Errors = new List<string> { "deliverable with the specified ID does not exist" }
                    };
                }

                _context.Deliverables.Remove(deliverable);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Deliverable deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Deliverable deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the deliverable" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the deliverable",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> DeliverableGetByIdAsync(IntIdViewModel model)
        {
            try
            {
                var deliverable = await _context.Deliverables.FindAsync(model.Id);

                if(deliverable != null)
                {
                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Deliverables retrieved successfully",
                        Data = deliverable
                    };
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "No deliverable with specified id",
                    Data = deliverable
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching deliverables",
                    Errors = new List<string> { ex.Message }
                };
            }
            
        }

        public async Task<ResponseManager> SearchDeliverableAsync(DeliverableSearchViewModel model)
        {
            string searchKey = model.SearchKey;

            try
            {
                
                var searchResults = await _context.Deliverables
                    .Where(oc => EF.Functions.Like(oc.Name, $"%{model.SearchKey}%"))
                    .ToListAsync();

                if(searchResults.Count > 0)
                {
                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "No deliverables found",
                        Data = searchResults
                    };
                }

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched deliverable retrieved successfully",
                    Data = searchResults
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching searched deliverables",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateDeliverableAsync(DeliverableUpdateViewModel model)
        {
            try
            {
                var deliverable = await _context.Deliverables.FindAsync(model.Id);

                if (deliverable == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Deliverable not found",
                        Errors = new List<string> { "Deliverable with the specified ID does not exist" }
                    };
                }

                // Update the course properties from the model
                deliverable.Name = model.Name;
                deliverable.Description = model.Description;
                deliverable.Instruction = model.Instruction;
                deliverable.ForAdviser = model.ForAdviser;
                deliverable.GroupSubmission = model.GroupSubmission;


                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Deliverable updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Deliverable update failed",
                        Errors = new List<string> { "Error occurred while updating the deliverable" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the deliverable",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> ViewDeliverableAsync()
        {
            try
            {
                var result = await _context.Deliverables.ToListAsync();

                if(result.Count >0)
                {
                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Deliverables retrieved successfully",
                        Data = result
                    };
                }
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "No deliverables found",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching deliverables",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
    }
}
