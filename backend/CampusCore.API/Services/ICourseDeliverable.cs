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
                CourseId = model.CourseId,
                DeliverableId = model.DeliverableId
            };


            _context.CourseDeliverables.Add(courseDeliverable);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                

                var res = await _context.OfferedCourses
                                   .Where(oc=> oc.CourseId == model.CourseId)
                                   .ToListAsync();
                if (res.Count > 0)
                {
                    foreach (var item in res)
                    {

                        var offeredCourseDeliverable = new OfferedCourseDeliverable
                        {
                            OfferedCourseId = item.Id,
                            DeliverableId = model.DeliverableId,
                            Deadline = null
                        };
                        _context.OfferedCourseDeliverables.Add(offeredCourseDeliverable);
                        
                    }
                    var re = await _context.SaveChangesAsync();

                    if (re <= 0)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Course deliverable template updated but associated offered course is not updated",
                            IsSuccess = false,
                            Errors = new List<string> { "There's a problem with updating the item in the offered-course-deliverable table"}
                        };
                    }

                    return new ResponseManager
                    {
                        Message = "Course deliverable added successfully and updated existing offered courses!",
                        IsSuccess = true
                    };
                }

            }



            return new ErrorResponseManager
            {
                Message = "Course enrollement is not added",
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
                                               .Where(ce => ce.CourseId == model.Id)
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



        
    }
}
