using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IOfferedCourseService
    {
        Task<ResponseManager> CreateOfferedCourseAsync(OfferedCourseAddViewModel model);
        Task<ResponseManager> ViewOfferedCourseListAsync();
        Task<ResponseManager> DeleteOfferedCourseAsync(OfferedCourseDeleteModel model); // New method to delete a course
        Task<ResponseManager> UpdateOfferedCourseAsync(OfferedCourseUpdateViewModel model);
    }

    public class OfferedCourseService : IOfferedCourseService
    {
        private AppDbContext _context;
        public OfferedCourseService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateOfferedCourseAsync(OfferedCourseAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var offeredCourse = new OfferedCourse
            {
                Sem = model.Sem,
                AcadYear = model.AcadYear,
                Schedule = model.Schedule,
                FacultyId = model.FacultyId,
                CourseId = model.CourseId

            };


            _context.OfferedCourses.Add(offeredCourse);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Offered course added successfully!",
                    IsSuccess = true
                };

            }



            return new ErrorResponseManager
            {
                Message = "Offered Course is not added",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating adding offered course in DB" }
            };

        }

        public async Task<ResponseManager> DeleteOfferedCourseAsync(OfferedCourseDeleteModel model)
        {
            try
            {
                var offeredCourse = await _context.OfferedCourses.FindAsync(model.Id);

                if (offeredCourse == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Offered course not found",
                        Errors = new List<string> { "Course with the specified ID does not exist" }
                    };
                }

                _context.OfferedCourses.Remove(offeredCourse);
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
                        Message = "Offered Course deletion failed",
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

        public async Task<ResponseManager> UpdateOfferedCourseAsync(OfferedCourseUpdateViewModel model)
        {
            try
            {
                var offeredCourse = await _context.OfferedCourses.FindAsync(model.Id);

                if (offeredCourse == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Course not found",
                        Errors = new List<string> { "Course with the specified ID does not exist" }
                    };
                }

                // Update the offered course properties from the model
                offeredCourse.Sem = model.Sem;
                offeredCourse.AcadYear = model.AcadYear;
                offeredCourse.Schedule = model.Schedule;
                offeredCourse.FacultyId = model.FacultyId;
                offeredCourse.CourseId = model.CourseId;

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

        public async Task<ResponseManager> ViewOfferedCourseListAsync()
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
        
        //public async Task<ResponseManager> SearchOfferedCourseListAsync(OfferedCourseSearchViewModel model)
        //{
        //    string searchKey = model.SearchKey;
        //    string searchCategory = model.SearchCategory;

        //    if (string.IsNullOrEmpty(model.SearchKey) || string.IsNullOrWhiteSpace(model.SearchKey))
        //    {
        //        try
        //        {
        //            var result = await _context.OfferedCourses.ToListAsync();

        //            return new DataResponseManager
        //            {
        //                IsSuccess = true,
        //                Message = "Offered courses retrieved successfully",
        //                Data = result
        //            };
        //        }
        //        catch (Exception ex)
        //        {
        //            return new ErrorResponseManager
        //            {
        //                IsSuccess = false,
        //                Message = "An error occurred while fetching offered courses",
        //                Errors = new List<string> { ex.Message }
        //            };
        //        }
        //    }
        //    else
        //    {
        //        try
        //        {
        //            List<OfferedCourse> searchResults;

        //            if (searchCategory == "Course")
        //            {
        //                searchResults = await _context.OfferedCourses
        //                    .Include(oc => oc.Course)
        //                    .Where(oc => EF.Functions.Like(oc.Course.Name, $"%{model.SearchKey}%"))
        //                    .ToListAsync();
        //            }
        //            else if (searchCategory == "Faculty")
        //            {
        //                searchResults = await _context.OfferedCourses
        //                    .Include(oc => oc.FacultyAssigned)
        //                    .Where(oc => EF.Functions.Like(oc.FacultyAssigned.FirstName, $"%{model.SearchKey}%") ||
        //                                 EF.Functions.Like(oc.FacultyAssigned.LastName, $"%{model.SearchKey}%"))
        //                    .ToListAsync();
        //            }
        //            else
        //            {
        //                // Handle an unexpected search category
        //                return new ErrorResponseManager
        //                {
        //                    IsSuccess = false,
        //                    Message = "An error occurred while fetching offered courses",
        //                    Errors = new List<string> { "Unexpected search category" }
        //                };
        //            }

        //            return new DataResponseManager
        //            {
        //                IsSuccess = true,
        //                Message = "Offered courses retrieved successfully",
        //                Data = searchResults
        //            };
        //        }
        //        catch (Exception ex)
        //        {
        //            return new ErrorResponseManager
        //            {
        //                IsSuccess = false,
        //                Message = "An error occurred while fetching offered courses",
        //                Errors = new List<string> { ex.Message }
        //            };
        //        }
        //    }

            // Add a default return statement or throw an exception here.
        //}
    

    }
}
