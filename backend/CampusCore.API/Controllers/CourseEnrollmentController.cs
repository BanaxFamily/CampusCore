using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseEnrollmentController:Controller
    {
        private ICourseEnrollmentService _courseEnrollmentService;

        CourseEnrollmentController(ICourseEnrollmentService courseEnrollmentService) 
        {
            _courseEnrollmentService = courseEnrollmentService;
        }

        // /api/course/create
        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
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
        public async Task<IActionResult> ViewListAsync(CourseEnrollmentListViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _courseEnrollmentService.ViewCourseEnrollmentListAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
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

        // /api/course/update
        [HttpPut("update")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateAsync([FromBody] CourseEnrollmentUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _courseEnrollmentService.UpdateCourseEnrollmentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }
    }
}
