using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/deliverable")]
    [ApiController]
    public class DeliverableController : Controller
    {


        private IDeliverableServices _deliverableService;

        public DeliverableController(IDeliverableServices deliverableService)
        {
            _deliverableService = deliverableService;
        }

        // /api/deliverable/create
        [HttpPost("create")]
        //[Authorize(Roles = "Dean")]
        public async Task<IActionResult> CreateAsync(DeliverableAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _deliverableService.CreateDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/deliverable/viewList
        //insert method here
        [HttpGet("viewList")]
        //[Authorize(Roles = "Dean,Faculty")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _deliverableService.ViewDeliverableAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        //api/deliverable/search
        // [Authorize(Roles = "Dean,Faculty")]
        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(DeliverableSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _deliverableService.SearchDeliverableAsync(model);

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

                var result = await _deliverableService.DeleteDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/Deliverable/update
        [HttpPut("update")]
        //[Authorize(Roles = "Dean")]
        public async Task<IActionResult> UpdateAsync([FromBody] DeliverableUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _deliverableService.UpdateDeliverableAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        // /api/Deliverable/getById
        [HttpPut("getById")]
        //[Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetByIdAsync([FromBody] IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _deliverableService.DeliverableGetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }

}
