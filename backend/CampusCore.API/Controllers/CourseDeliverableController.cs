using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/course-deliverable")]
    [ApiController]
    public class CourseDeliverableController:Controller
    {
        private ICourseDeliverableService _cdService;

        public CourseDeliverableController(ICourseDeliverableService cdService)
        {
            _cdService = cdService;
        }

        // /api/course-deliverable/create
        [HttpPost("create")]
        //[Authorize(Roles = "Dean")]
        public async Task<IActionResult> CreateAsync(CourseDeliverableAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _cdService.CreateCourseDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        
        

        [HttpDelete("delete")]
        // [Authorize(Roles = "Dean")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _cdService.DeleteCourseDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/course-deliverable/getAll
        [HttpGet("getAll")]
        //[Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetAllAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _cdService.GetAllAsync();

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


        // /api/course-deliverable/getById
        [HttpPost("getByCourse")]
        //[Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetByCourseAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _cdService.GetByCourseAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

    }
}
