using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/offeredCourseDeliverable")]
    [ApiController]
    public class OfferedCourseDeliverableController : Controller
    {
        private IOfferedCourseDeliverableService _offeredCourseDeliverableService;

        public OfferedCourseDeliverableController(IOfferedCourseDeliverableService offeredCourseDeliverableService)
        {
            _offeredCourseDeliverableService = offeredCourseDeliverableService;
        }

        // /api/offeredCourseDeliverable/create
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(OfferedCourseDeliverableAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseDeliverableService.CreateOfferedCourseDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/offeredCouseDeliverable/getAll
        //insert method here
        [HttpGet("getAll")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseDeliverableService.ViewOfferedCourseDeliverableListAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/offeredCourseDeliverable/getById
        [HttpPost("getById")]
        public async Task<IActionResult> GetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseDeliverableService.GetByIdOfferedCourseDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/offeredCourseDeliverable/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] OfferedCourseDeliverableUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _offeredCourseDeliverableService.UpdateOfferedCourseDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
