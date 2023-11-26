using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IOfferedCourseDeliverableService
    {
        Task<ResponseManager> ViewOfferedCourseDeliverableListAsync(); // new method to get Offered Course Deliverable
        Task<ResponseManager> GetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> GetByOfferedCourseOfferedCourseDeliverableAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateOfferedCourseDeliverableAsync(OfferedCourseDeliverableUpdateViewModel model);

    }

    public class OfferedCourseDeliverableService : IOfferedCourseDeliverableService
    {
        private AppDbContext _context;
        public OfferedCourseDeliverableService(AppDbContext context)
        {
            _context = context;
        }
       

        public async Task<ResponseManager> ViewOfferedCourseDeliverableListAsync()
        {
            try
            {
                var result = await _context.OfferedCourseDeliverables
                                            .Select( a => new
                                            {
                                                OfferedCourseDeliverableId = a.Id,
                                                DeliverableId = a.DeliverableId,
                                                DeliverableTitle = a.Deliverable.Name,
                                                DeliverableInstruction = a.Deliverable.Instruction,
                                                DeliverableDescription = a.Deliverable.Description,
                                                DeliverableDeadline = a.Deadline,
                                                OfferedCourseName = a.OfferedCourse.Course.Name,
                                                OfferedCourseId = a.OfferedCourseId,
                                                FacultyAssigned = a.OfferedCourse.FacultyAssigned.FullName,
                                                FacultyId = a.OfferedCourse.FacultyId
                                                
                                            })
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

        public async Task<ResponseManager> GetByIdAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.OfferedCourseDeliverables
                                            .Where(a => a.Id == model.Id)
                                            .Select(a => new
                                            {
                                                DeliverableId = a.DeliverableId,
                                                DeliverableTitle = a.Deliverable.Name,
                                                DeliverableInstruction = a.Deliverable.Instruction,
                                                DeliverableDescription = a.Deliverable.Description,
                                                DeliverableDeadline = a.Deadline,
                                                OfferedCourseName = a.OfferedCourse.Course.Name,
                                                OfferedCourseId = a.OfferedCourseId,
                                                FacultyAssigned = a.OfferedCourse.FacultyAssigned.FullName,
                                                FacultyId = a.OfferedCourse.FacultyId

                                            })
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

        public async Task<ResponseManager> GetByOfferedCourseOfferedCourseDeliverableAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.OfferedCourseDeliverables
                                            .Where(a => a.OfferedCourseId == model.Id)
                                            .Select(a => new
                                            {
                                                DeliverableId = a.DeliverableId,
                                                DeliverableTitle = a.Deliverable.Name,
                                                DeliverableInstruction = a.Deliverable.Instruction,
                                                DeliverableDescription = a.Deliverable.Description,
                                                DeliverableDeadline = a.Deadline,
                                                OfferedCourseName = a.OfferedCourse.Course.Name,
                                                OfferedCourseId = a.OfferedCourseId,
                                                FacultyAssigned = a.OfferedCourse.FacultyAssigned.FullName,
                                                FacultyId = a.OfferedCourse.FacultyId

                                            })
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
