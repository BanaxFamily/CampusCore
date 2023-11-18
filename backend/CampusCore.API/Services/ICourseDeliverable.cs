using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface ICourseDeliverableService
    {
        Task<ResponseManager> CreateCourseDeliverableAsync(CourseDeliverableAddViewModel model);
        Task<ResponseManager> GetByCourseAsync(IntIdViewModel model);
        Task<ResponseManager> GetAllAsync();
        Task<ResponseManager> UpdateAsync(CourseDeliverableUpdateViewModel model);
        Task<ResponseManager> DeleteCourseDeliverableAsync(IntIdViewModel model);
    }

    public class CourseDeliverableService : ICourseDeliverableService
    {
        private AppDbContext _context;

        public CourseDeliverableService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseManager> CreateCourseDeliverableAsync(CourseDeliverableAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var courseDeliverable = new CourseDeliverable
            {
                OfferedCourseId = model.OfferedCourseId,
                DeliverableId = model.DeliverableId,
                DeliverableDeadline = model.DeliverableDeadline
            };


            _context.CourseDeliverables.Add(courseDeliverable);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "current course deliverable added successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Course enrollemnt is not added",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding current course deliverable in DB" }
            };
        }

        public async Task<ResponseManager> DeleteCourseDeliverableAsync(IntIdViewModel model)
        {
            try
            {
                var courseDeliverable = await _context.CourseDeliverables.FindAsync(model.Id);

                if (courseDeliverable == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "current course deliverable not found",
                        Errors = new List<string> { "current course deliverable with the specified ID does not exist" }
                    };
                }

                _context.CourseDeliverables.Remove(courseDeliverable);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "current course deliverable deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "current course deliverable deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the current course deliverable" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the current course deliverable",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllAsync()
        {

            try
            {
                var result = await _context.CourseDeliverables
                                            .Include(cd=> cd.Deliverable)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Current course deliverables retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching current course deliverables",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetByCourseAsync(IntIdViewModel model)
        {

                try
                {
                    var result = await _context.CourseDeliverables
                                               .Include(cd => cd.Deliverable)
                                               .Where(ce => ce.OfferedCourseId == model.Id)
                                               .ToListAsync();

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Current course deliverables retrieved successfully",
                        Data = result
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching current course deliverables",
                        Errors = new List<string> { ex.Message }
                    };
                }
        }



        public async Task<ResponseManager> UpdateAsync(CourseDeliverableUpdateViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var courseDeliverable = new CourseDeliverable
            {
                DeliverableDeadline = model.DeliverableDeadline
            };


            _context.CourseDeliverables.Add(courseDeliverable);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "current course deliverable added successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Course enrollemnt is not added",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding current course deliverable in DB" }
            };
        }
    }
}
