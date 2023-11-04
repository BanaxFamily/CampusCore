using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface ICourseService
    {
        Task<ResponseManager> CreateCourseAsync(CourseAddViewModel model);
        Task<ResponseManager> ViewCourseListAsync(CourseListViewModel model); // new method to get course
        Task<ResponseManager> DeleteCourseAsync(CourseDeleteModel model); // New method to delete a course
        Task<ResponseManager> UpdateCourseAsync(CourseUpdateViewModel model);

    }

    public class CourseService : ICourseService
    {
        private AppDbContext _context;
        public CourseService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateCourseAsync(CourseAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var course = new Course
            {
                Name = model.Name,
                Status = model.Status,
                Description = model.Description,

            };

           
                _context.Courses.Add(course);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        Message = "User created successfully!",
                        IsSuccess = true
                    };

                }
            
            

                return new ErrorResponseManager
                {
                    Message = "Course is not created",
                    IsSuccess = false,
                    Errors = new List<string>() { "Error updating adding course in DB" }
                };
            


           

        }

        public async Task<ResponseManager> ViewCourseListAsync(CourseListViewModel model)
        {
            string searchKey = model.SearchKey;

            if (string.IsNullOrEmpty(model.SearchKey) || string.IsNullOrWhiteSpace(model.SearchKey))
            {
                try
                {
                    var result = await _context.OfferedCourses.ToListAsync();

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Offered courses retrieved successfully",
                        Data = result
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching offered courses",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            else
            {
                try
                {
                    
                    var searchResults = await _context.Courses
                        .Where(oc => EF.Functions.Like(oc.Name, $"%{model.SearchKey}%"))
                        .ToListAsync();
                 
                  

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Offered courses retrieved successfully",
                        Data = searchResults
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching offered courses",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }

            // Add a default return statement or throw an exception here.
        }

    

        public async Task<ResponseManager> DeleteCourseAsync(CourseDeleteModel model)
        {
            try
            {
                var course = await _context.Courses.FindAsync(model.Id);

                if (course == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Course not found",
                        Errors = new List<string> { "Course with the specified ID does not exist" }
                    };
                }

                _context.Courses.Remove(course);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Course deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Course deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the course" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the course",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateCourseAsync(CourseUpdateViewModel model)
        {
            try
            {
                var course = await _context.Courses.FindAsync(model.Id);

                if (course == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Course not found",
                        Errors = new List<string> { "Course with the specified ID does not exist" }
                    };
                }

                // Update the course properties from the model
                course.Name = model.Name;
                course.Status = model.Status;
                course.Description = model.Description;

                // Save changes to the database
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "Course updated successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Course update failed",
                        Errors = new List<string> { "Error occurred while updating the course" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the course",
                    Errors = new List<string> { ex.Message }
                };
            }
        }


    }
}
