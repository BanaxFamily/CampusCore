using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IOfferedCourseService
    {
        Task<ResponseManager> CreateOfferedCourseAsync(OfferedCourseAddViewModel model);
        Task<ResponseManager> ViewOfferedCourseListAsync();
        Task<ResponseManager> DeleteOfferedCourseAsync(IntIdViewModel model); 
        Task<ResponseManager> UpdateOfferedCourseAsync(OfferedCourseUpdateViewModel model);
        Task<ResponseManager> ViewOfferedCourseBySemAsync(OfferedCourseBySem model);
        Task<ResponseManager> OfferedCourseGetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> OfferedCourseGetNeedDeansApprovalAsync();


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
                CourseId = model.CourseId,
                IsNeedDeansApproval = model.IsNeedDeansApproval,

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

        public async Task<ResponseManager> DeleteOfferedCourseAsync(IntIdViewModel model)
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
                offeredCourse.IsNeedDeansApproval = model.IsNeedDeansApproval;

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
                var result = await _context.OfferedCourses
                                            .Include(oc => oc.Course)
                                            .Include(oc => oc.FacultyAssigned)
                                            .ToListAsync();

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
        public async Task<ResponseManager> ViewOfferedCourseBySemAsync(OfferedCourseBySem model)
        {
            try
            {
                var result = await _context.OfferedCourses
                                            .Where(oc => oc.Sem == model.Sem && oc.AcadYear == model.AcadYear)
                                            .Include(oc => oc.Course)
                                            .Include(oc => oc.FacultyAssigned)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Offered courses for {model.Sem} {model.AcadYear} retrieved successfully",
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
        public async Task<ResponseManager> OfferedCourseGetNeedDeansApprovalAsync()
        {
            try
            {
                var result = await _context.OfferedCourses
                                            .Where(oc => oc.IsNeedDeansApproval == true)
                                            .Include(oc => oc.Course)
                                            .Include(oc => oc.FacultyAssigned)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Offered courses retrieved successfully",
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
        public async Task<ResponseManager> ViewOfferedCourseByFacultyAsync(OfferedCourseByFacultyModel model)
        {
            try
            {
                var result = await _context.OfferedCourses
                                            .Where(oc => oc.Sem == model.Sem && oc.AcadYear == model.AcadYear && oc.FacultyId == model.FacultyId)
                                            
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Offered courses for {model.Sem} {model.AcadYear} retrieved successfully",
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
        public async Task<ResponseManager> OfferedCourseGetByIdAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.OfferedCourses
                                            .Include(oc => oc.Course)
                                            .Include(oc => oc.FacultyAssigned)
                                            .Where(oc => oc.Id == model.Id)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Offered course retrieved successfully",
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
        
        
    

    }
}
