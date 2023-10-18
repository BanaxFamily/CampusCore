using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface ICourseService
    {
        Task<ResponseManager> CreateCourseAsync(CourseAddViewModel model);

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
            
            

                return new ResponseManager
                {
                    Message = "Course is not created",
                    IsSuccess = false,
                    Errors = new List<string>() { "Error updating adding course in DB" }
                };
            


           

        }

        //public async Task<ResponseManager> ViewCourseListAsync(ViewCourseListViewModel model)
    }
}
