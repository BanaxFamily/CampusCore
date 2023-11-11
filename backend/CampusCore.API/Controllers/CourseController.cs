using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
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
            //[Authorize(Roles = "Admin")]
            public async Task<IActionResult> CreateAsync(CourseAddViewModel model)
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
            [HttpGet("viewList")]
            public async Task<IActionResult> ViewListAsync()
            {
                if (ModelState.IsValid)
                {
                    var result = await _courseService.ViewCourseListAsync();

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid"); //status code: 400
            }

        [HttpGet("getAllOpen")]
        public async Task<IActionResult> ViewListOpenAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _courseService.ViewCourseListOpenAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/course/search
        [HttpPost("search")]
            public async Task<IActionResult> SearchAsync(CourseSearchViewModel model)
            {
                if (ModelState.IsValid)
                {
                    var result = await _courseService.SearchCourseAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid"); //status code: 400
            }


        //api/course/search
        [HttpPost("getById")]
        public async Task<IActionResult> CourseGetByIdAsync(GetByIdModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _courseService.CourseGetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


            [HttpDelete("delete")]
            //  [Authorize(Roles = "Admin")]
            public async Task<IActionResult> DeleteAsync(CourseDeleteModel model)
            {
                if (ModelState.IsValid)
                {
                
                var result = await _courseService.DeleteCourseAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid for delete"); //status code: 400
            }

                // /api/course/update
            [HttpPut("update")]
            //[Authorize(Roles = "Admin")]
            public async Task<IActionResult> UpdateAsync([FromBody] CourseUpdateViewModel model)
            {
                if (ModelState.IsValid)
                {
                    var result = await _courseService.UpdateCourseAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); // Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid for update"); // Status code: 400
            }


    }
}
