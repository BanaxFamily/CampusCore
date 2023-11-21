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

        [HttpPost("update")]
        public async Task<IActionResult> UpdateOfferedCourseAsync([FromBody] OfferedCourseUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseService.UpdateOfferedCourseAsync(model);

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
                var result = await _offeredCourseService.ViewOfferedCourseListAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        // /api/course/viewListSem
        //insert method here
        [HttpPost("viewListSem")]
        public async Task<IActionResult> ViewListBySemAsync(OfferedCourseBySem model)
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseService.ViewOfferedCourseBySemAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        [HttpPost("viewListIsNeedDeansApproval")]
        public async Task<IActionResult> OfferedCourseGetNeedDeansApprovalAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseService.OfferedCourseGetNeedDeansApprovalAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        //insert method here
        [HttpPost("getById")]
        public async Task<IActionResult> GetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseService.OfferedCourseGetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //[Authorize(Roles = "Admin,Dean")]
        [HttpDelete("delete")]
            public async Task<IActionResult> DeleteAsync([FromBody] IntIdViewModel model)
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
