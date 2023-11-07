using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    
        [Route("api/offered-course")]
        [ApiController]
        public class OfferedCourseController : Controller
        {
            private IOfferedCourseService _offeredCourseService;

            public OfferedCourseController(IOfferedCourseService offeredCourseService)
            {
                _offeredCourseService = offeredCourseService;
            }

  
        //[Authorize(Roles = "Admin,Dean")]
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync([FromBody] OfferedCourseAddViewModel model)
            {
                if (ModelState.IsValid)
                {
                    var result = await _offeredCourseService.CreateOfferedCourseAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid"); //status code: 400
            }

            // /api/course/viewList
            //insert method here
            [HttpGet("viewList")]
            public async Task<IActionResult> ViewListAsync([FromBody] OfferedCourseListViewModel model)
            {
                if (ModelState.IsValid)
                {
                    var result = await _offeredCourseService.ViewOfferedCourseListAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid"); //status code: 400
            }

        //[Authorize(Roles = "Admin,Dean")]
        [HttpDelete("delete")]
            public async Task<IActionResult> DeleteAsync([FromBody] OfferedCourseDeleteModel model)
            {
                if (ModelState.IsValid)
                {

                    var result = await _offeredCourseService.DeleteOfferedCourseAsync(model);

                    if (result.IsSuccess)
                        return Ok(result); //Status code: 200

                    return BadRequest(result);
                }
                return BadRequest("Some properties are not valid for delete"); //status code: 400
            }

     


    }
    
}
