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
        [Authorize(Roles = "Admin,Dean")]
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

        // /api/course/viewList
        //insert method here
        [HttpGet("viewList")]
        [Authorize(Roles = "Admin,Dean,Faculty,Student")]
        public async Task<IActionResult> ViewListAsync()
        {
            var role = User.FindFirstValue(ClaimTypes.Role);
            if (ModelState.IsValid)
            {
                var result = await _courseEnrollmentService.ViewCourseEnrollmentAsync(role,User.FindFirstValue(ClaimTypes.NameIdentifier));

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,Dean")]
        public async Task<IActionResult> DeleteAsync(CourseEnrollmentDeleteViewModel model)
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
