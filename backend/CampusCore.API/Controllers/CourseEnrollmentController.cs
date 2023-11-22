using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CampusCore.API.Controllers
{
    [Route("api/course-enrollment")]
    [ApiController]
    public class CourseEnrollmentController:Controller
    {
        private ICourseEnrollmentService _courseEnrollmentService;

        public CourseEnrollmentController(ICourseEnrollmentService courseEnrollmentService) 
        {
            _courseEnrollmentService = courseEnrollmentService;
        }

        // /api/course/create
        [HttpPost("create")]
        //[Authorize(Roles = "Admin,Dean")]
        public async Task<IActionResult> CreateAsync(CourseEnrollmentAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _courseEnrollmentService.CreateCourseEnrollmentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/course/create
        [HttpPost("courseEnrolled")]
        //[Authorize(Roles = "Student")]
        public async Task<IActionResult> ViewCourseEnrolledAsync(GetEnrolledCourseViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _courseEnrollmentService.GetAllCourseEnrolled(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        [HttpPost("enrolledStudents")]
        //[Authorize(Roles = "Admin,Dean,Faculty")]
        public async Task<IActionResult> GetEnrolledStudents(GetEnrolledStudentsViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _courseEnrollmentService.GetEnrolledStudents(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,Dean")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _courseEnrollmentService.DeleteCourseEnrollmentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

       
    }
}
