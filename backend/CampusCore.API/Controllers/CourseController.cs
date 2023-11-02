﻿using CampusCore.API.Services;
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

            [HttpDelete("delete")]
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
