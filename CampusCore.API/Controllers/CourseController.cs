using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
   
        [Route("api/course")]
        [ApiController]
        public class CourseController : Controller
        {
            private ICourseService _courseService;

            public CourseController(ICourseService courseService)
            {
                _courseService = courseService;
            }

            // /api/course/create
            [HttpPost("create")]
            public async Task<IActionResult> CreateAsync(AddCourseViewModel model)
            {
                if (ModelState.IsValid)
                {
                    var result = await _courseService.CreateCourseAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid"); //status code: 400
            }

        // /api/course/viewList
        //insert method here
        }
    }
