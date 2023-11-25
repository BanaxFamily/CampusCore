using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IOfferedCourseDeliverableService
    {
        Task<ResponseManager> CreateOfferedCourseDeliverableAsync(OfferedCourseDeliverableAddViewModel model);
        Task<ResponseManager> ViewOfferedCourseDeliverableListAsync(); // new method to get Offered Course Deliverable
        Task<ResponseManager> GetByIdOfferedCourseDeliverableAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateOfferedCourseDeliverableAsync(OfferedCourseDeliverableUpdateViewModel model);

    }

    public class OfferedCourseDeliverableService : IOfferedCourseDeliverableService
    {
        private AppDbContext _context;
        public OfferedCourseDeliverableService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateOfferedCourseDeliverableAsync(OfferedCourseDeliverableAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var offeredCourseDeliverable = new OfferedCourseDeliverable
            {
                DeliverableId = model.DeliverableId,
                Deadline = model.Deadline,
                OfferedCourseId = model.OfferedCourseId,
            };


            _context.OfferedCourseDeliverables.Add(offeredCourseDeliverable);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Offered Course Deliverable created successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Offered Course Deliverable is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding Offered Course Deliverable in the Database" }
            };
        }

        public async Task<ResponseManager> ViewOfferedCourseDeliverableListAsync()
        {
            try
            {
                var result = await _context.OfferedCourseDeliverables
                                            .Include(a => a.Deliverable)
                                            .Include(a => a.OfferedCourse)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Offered Course Deliverable retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching Offered Course Deliverable",
                    Errors = new List<string> { ex.Message }
                };
            }

            // Add a default return statement or throw an exception here.
        }

        public async Task<ResponseManager> GetByIdOfferedCourseDeliverableAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.OfferedCourseDeliverables
                                            .Include(a => a.Deliverable)
                                            .Include(a => a.OfferedCourse)
                                            .Where(a => a.Id == model.Id)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Offered Course Deliverable retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching Offered Course Deliverable",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateOfferedCourseDeliverableAsync(OfferedCourseDeliverableUpdateViewModel model)
        {
            try
            {
                var offeredCourseDeliverable = await _context.OfferedCourseDeliverables.FindAsync(model.Id);

                if (offeredCourseDeliverable == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Offered Course Deliverable not found",
                        Errors = new List<string> { "Offered Course Deliverable with the specified ID does not exist" }
                    };
                }

                // Update the Offered Course Deliverable properties from the model
                offeredCourseDeliverable.Id = model.Id;
                offeredCourseDeliverable.Deadline = model.Deadline;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Offered Course Deliverable updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Offered Course Deliverable update failed",
                        Errors = new List<string> { "Error occurred while updating the Offered Course Deliverable" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the Offered Course Deliverable",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
