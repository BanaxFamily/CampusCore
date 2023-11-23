using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/issueComment")]
    [ApiController]
    public class IssueCommentController : Controller
    {
        private IIssueCommentService _issueCommentService;

        public IssueCommentController(IIssueCommentService issueCommentService)
        {
            _issueCommentService = issueCommentService;
        }

        // /api/issueComment/create
        [Authorize(Roles = "Dean,Faculty,Student")]
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(IssueCommentAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueCommentService.CreateIssueCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/issueComment/viewList
        //insert method here
        [Authorize(Roles = "Dean,Faculty,Student")]
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _issueCommentService.ViewIssueCommentListAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/issueComment/search
        [Authorize(Roles = "Dean,Faculty,Student")]
        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(StringSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueCommentService.SearchIssueCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        //api/issueComment/search
        [Authorize(Roles = "Dean,Faculty,Student")]
        [HttpPost("getById")]
        public async Task<IActionResult> IssueCommentGetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueCommentService.IssueCommentGetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [Authorize(Roles = "Dean,Faculty,Student")]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _issueCommentService.DeleteIssueCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/issueComment/update
        [Authorize(Roles = "Dean,Faculty,Student")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] IssueCommentUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueCommentService.UpdateIssueCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
