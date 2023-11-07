using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CampusCore.API.Services
{
    public interface ICourseEnrollmentService
    {
        Task<ResponseManager> CreateCourseEnrollmentAsync(CourseEnrollmentAddViewModel model);
        Task<ResponseManager> ViewCourseEnrollmentAsync(string role, string studentId);
        Task<ResponseManager> DeleteCourseEnrollmentAsync(CourseEnrollmentDeleteViewModel model);
    }

    public class CourseEnrollmentService : ICourseEnrollmentService
    {
        private AppDbContext _context;

        public CourseEnrollmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseManager> CreateCourseEnrollmentAsync(CourseEnrollmentAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var courseEnrollment = new CourseEnrollment
            {
                OfferedCourseId = model.OfferedCourseId,
                StudentId = model.StudentId
            };


            _context.CourseEnrollments.Add(courseEnrollment);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "enrolled course added successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Course enrollemnt is not added",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding enrolled course in DB" }
            };
        }

        public async Task<ResponseManager> DeleteCourseEnrollmentAsync(CourseEnrollmentDeleteViewModel model)
        {
            try
            {
                var courseEnrollment = await _context.CourseEnrollments.FindAsync(model.Id);

                if (courseEnrollment == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "enrolled course not found",
                        Errors = new List<string> { "enrolled course with the specified ID does not exist" }
                    };
                }

                _context.CourseEnrollments.Remove(courseEnrollment);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "enrolled course deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "enrolled course deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the enrolled course" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the enrolled course",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        

        public async Task<ResponseManager> ViewCourseEnrollmentAsync(string role, string studentId)
        {
            

            if(role == "Student")
            {
                try
                {
                    var result = await _context.CourseEnrollments
                                 .Where(ce => ce.StudentId == studentId)
                                 .ToListAsync();

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Enrolled courses retrieved successfully",
                        Data = result
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching enrolled courses",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            else
            {
                try
                {
                    var result = await _context.CourseEnrollments
                                 .ToListAsync();

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Courses and students retrieved successfully",
                        Data = result
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching enrolled courses",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            
        }

       
    }
}
