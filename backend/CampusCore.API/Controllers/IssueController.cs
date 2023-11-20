using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/issue")]
    [ApiController]
    public class IssueController : Controller
    {
        private IIssueService _issueService;

        public IssueController(IIssueService issueService)
        {
            _issueService = issueService;
        }

        // /api/Issue/create
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(IssueAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.CreateIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/Issue/viewList
        //insert method here
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.ViewIssueListAsync();

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
                var result = await _issueService.ViewIssueListOpenAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/Issue/search
        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(StringSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.SearchIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        //api/Issue/search
        [HttpPost("getById")]
        public async Task<IActionResult> IssueGetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.IssueGetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _issueService.DeleteIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/Issue/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] IssueUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.UpdateIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
